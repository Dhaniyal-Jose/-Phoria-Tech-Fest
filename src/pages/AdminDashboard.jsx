import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { supabase } from '../supabaseClient';
import { Users, Download, LogOut, Trash2, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import CertificateTemplate from '../components/CertificateTemplate';
import './AdminDashboard.css';

// Register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'feedbacks'
    const [registrations, setRegistrations] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certData, setCertData] = useState({ name: '', event: '', date: '' });
    const certificateRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'registrations') {
            fetchRegistrations();
        } else {
            fetchFeedbacks();
        }
    }, [activeTab]);

    const fetchRegistrations = async () => {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRegistrations(data || []);
        } catch (err) {
            console.error('Error fetching data:', err);
            // Mock data if Supabase isn't connected properly to show the UI
            if (err.message && err.message.includes('placeholder')) {
                setRegistrations([
                    { id: '1', full_name: 'Jane Doe', email: 'jane@example.com', phone: '+91 9876543210', college: 'AJCE', created_at: new Date().toISOString() },
                    { id: '2', full_name: 'Alex Smith', email: 'alex@example.com', phone: '+91 8765432109', college: 'Demo University', created_at: new Date(Date.now() - 86400000).toISOString() }
                ]);
                setError('Displaying mock data. Connect valid Supabase keys to load real data.');
            } else {
                setError(err.message || 'Failed to fetch registrations.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchFeedbacks = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setFeedbacks(data || []);
        } catch (err) {
            console.error('Error fetching feedbacks:', err);
            if (err.message && err.message.includes('placeholder')) {
                setFeedbacks([
                    { id: '1', name: 'Demo User', email: 'demo@example.com', message: 'This event looks amazing!', created_at: new Date().toISOString() }
                ]);
                setError('Displaying mock feedback data. Connect valid keys.');
            } else {
                setError(err.message || 'Failed to fetch feedback.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRegistration = async (id) => {
        if (!window.confirm("Are you sure you want to delete this registration? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('registrations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from local state
            setRegistrations(registrations.filter(reg => reg.id !== id));
        } catch (err) {
            console.error("Error deleting registration:", err);
            if (err.message && err.message.includes('placeholder')) {
                setRegistrations(registrations.filter(reg => reg.id !== id));
                setError('Deleted mock registration locally.');
            } else {
                alert(`Failed to delete registration: ${err.message}`);
            }
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback message?")) return;

        try {
            const { error } = await supabase
                .from('feedbacks')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from local state
            setFeedbacks(feedbacks.filter(fb => fb.id !== id));
        } catch (err) {
            console.error("Error deleting feedback:", err);
            if (err.message && err.message.includes('placeholder')) {
                setFeedbacks(feedbacks.filter(fb => fb.id !== id));
                setError('Deleted mock feedback locally.');
            } else {
                alert(`Failed to delete feedback: ${err.message}`);
            }
        }
    };

    const handleGenerateCertificate = async (reg) => {
        // Force synchronous state update so the DOM updates immediately 
        flushSync(() => {
            setCertData({
                name: reg.full_name,
                event: reg.selected_event || 'General/All Events',
                date: reg.created_at
            });
        });

        if (!certificateRef.current) return;

        // Wait a very brief moment to ensure the component is cleanly rendered
        setTimeout(async () => {
            try {
                const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true, logging: false });
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const pdf = new jsPDF('l', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`uPhoria_Certificate_${reg.full_name.replace(/\s+/g, '_')}.pdf`);
            } catch (e) {
                console.error('Error generating certificate:', e);
                alert('Failed to generate certificate.');
            }
        }, 100);
    };

    const exportToCSV = () => {
        let headers, csvData, filename;

        if (activeTab === 'registrations') {
            headers = ['Full Name,Email,Phone,College,Selected Event,Registration Date'];
            csvData = registrations.map(reg => {
                const date = new Date(reg.created_at).toLocaleDateString();
                const event = reg.selected_event || 'General/All Events';
                return `"${reg.full_name}","${reg.email}","${reg.phone}","${reg.college}","${event}","${date}"`;
            });
            filename = `uphoria_registrations_${new Date().toISOString().split('T')[0]}.csv`;
        } else {
            headers = ['Name,Email,Feedback Message,Date'];
            csvData = feedbacks.map(fb => {
                const date = new Date(fb.created_at).toLocaleDateString();
                return `"${fb.name}","${fb.email}","${fb.message.replace(/"/g, '""')}","${date}"`;
            });
            filename = `uphoria_feedback_${new Date().toISOString().split('T')[0]}.csv`;
        }

        const csv = [...headers, ...csvData].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    // --- Analytics Computations ---
    const genderCounts = registrations.reduce((acc, reg) => {
        const g = reg.gender || 'Prefer not to say';
        acc[g] = (acc[g] || 0) + 1;
        return acc;
    }, {});

    const genderChartData = {
        labels: Object.keys(genderCounts),
        datasets: [{
            data: Object.values(genderCounts),
            backgroundColor: ['#3b82f6', '#ec4899', '#8b5cf6', '#9ca3af'],
            borderWidth: 0,
        }],
    };

    const collegeCounts = registrations.reduce((acc, reg) => {
        const c = reg.college || 'Unknown';
        acc[c] = (acc[c] || 0) + 1;
        return acc;
    }, {});

    // Sort colleges by top 5
    const sortedColleges = Object.entries(collegeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const collegeChartData = {
        labels: sortedColleges.map(c => c[0]),
        datasets: [{
            label: 'Top 5 Colleges',
            data: sortedColleges.map(c => c[1]),
            backgroundColor: 'rgba(124, 58, 237, 0.7)',
            borderColor: '#7c3aed',
            borderWidth: 1,
            borderRadius: 4
        }]
    };

    const dateCounts = registrations.reduce((acc, reg) => {
        const d = new Date(reg.created_at).toLocaleDateString();
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {});

    // Sort dates chronologically
    const sortedDates = Object.entries(dateCounts).sort((a, b) => new Date(a[0]) - new Date(b[0]));

    const timelineChartData = {
        labels: sortedDates.map(d => d[0]),
        datasets: [{
            label: 'Daily Registrations',
            data: sortedDates.map(d => d[1]),
            fill: true,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            tension: 0.3
        }]
    };

    return (
        <div className="admin-page">
            {/* Hidden Certificate Template explicitly for rendering PDF exports seamlessly */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', pointerEvents: 'none' }}>
                <CertificateTemplate ref={certificateRef} {...certData} />
            </div>

            <div className="admin-container glass">
                <div className="admin-header">
                    <div>
                        <h1>Admin <span className="text-gradient">Dashboard</span></h1>
                        <p>Manage µPhoria Tech Fest Data</p>
                    </div>
                    <div className="admin-stats glass">
                        <Users size={24} color="var(--accent-1)" />
                        <div className="stat-info">
                            <span className="stat-value">{activeTab === 'registrations' ? registrations.length : feedbacks.length}</span>
                            <span className="stat-label">Total {activeTab === 'registrations' ? 'Attendees' : 'Messages'}</span>
                        </div>
                    </div>
                </div>

                <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        className={`btn ${activeTab === 'registrations' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('registrations')}
                    >
                        Registrations
                    </button>
                    <button
                        className={`btn ${activeTab === 'feedbacks' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('feedbacks')}
                    >
                        User Feedback
                    </button>
                </div>

                {error && <div className="admin-error">{error}</div>}

                <div className="admin-controls">
                    <button onClick={exportToCSV} className="btn btn-secondary" disabled={(activeTab === 'registrations' ? registrations.length : feedbacks.length) === 0}>
                        <Download size={18} style={{ marginRight: '0.5rem' }} /> Export CSV
                    </button>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ borderColor: 'var(--accent-1)', color: 'var(--accent-1)' }}>
                        <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout
                    </button>
                </div>

                {/* Live Analytics Dashboard */}
                {activeTab === 'registrations' && registrations.length > 0 && (
                    <div className="analytics-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem'
                    }}>
                        <div className="chart-card glass" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#e5e7eb', fontSize: '1.1rem' }}>Demographics</h3>
                            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                                <Doughnut data={genderChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } } }} />
                            </div>
                        </div>
                        <div className="chart-card glass" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#e5e7eb', fontSize: '1.1rem' }}>Top Colleges</h3>
                            <div style={{ height: '250px' }}>
                                <Bar data={collegeChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }, x: { grid: { display: false }, ticks: { color: '#9ca3af' } } } }} />
                            </div>
                        </div>
                        <div className="chart-card glass" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#e5e7eb', fontSize: '1.1rem' }}>Registration Timeline</h3>
                            <div style={{ height: '300px' }}>
                                <Line data={timelineChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }, x: { grid: { display: false }, ticks: { color: '#9ca3af' } } } }} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="table-container">
                    {loading ? (
                        <div className="loading-state">Loading {activeTab}...</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                {activeTab === 'registrations' ? (
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>College/Org</th>
                                        <th>Event Tier</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {activeTab === 'registrations' ? (
                                    registrations.length > 0 ? (
                                        registrations.map(reg => (
                                            <tr key={reg.id || reg.email}>
                                                <td><strong>{reg.full_name}</strong></td>
                                                <td>{reg.email}</td>
                                                <td>{reg.phone}</td>
                                                <td>{reg.college}</td>
                                                <td><span className="badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>{(reg.selected_event || 'All Events').replace(/\s*\(.*?\)\s*/g, '')}</span></td>
                                                <td>{new Date(reg.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleGenerateCertificate(reg)}
                                                            className="btn"
                                                            style={{ padding: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                                                            title="Generate Certificate"
                                                        >
                                                            <Award size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteRegistration(reg.id)}
                                                            className="btn"
                                                            style={{ padding: '0.4rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                                            title="Delete Registration"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="empty-state">No registrations found yet.</td>
                                        </tr>
                                    )
                                ) : (
                                    feedbacks.length > 0 ? (
                                        feedbacks.map(fb => (
                                            <tr key={fb.id || fb.email}>
                                                <td><strong>{fb.name}</strong></td>
                                                <td>{fb.email}</td>
                                                <td style={{ maxWidth: '300px', whiteSpace: 'normal', lineHeight: '1.4' }}>{fb.message}</td>
                                                <td>{new Date(fb.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteFeedback(fb.id)}
                                                        className="btn"
                                                        style={{ padding: '0.4rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                                        title="Delete Feedback"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="empty-state">No feedback submitted yet.</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
