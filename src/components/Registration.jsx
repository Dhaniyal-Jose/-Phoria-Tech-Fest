import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Ticket from './Ticket';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        selectedEvent: 'Code Debugging',
        gender: 'Prefer not to say'
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [registeredData, setRegisteredData] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Basic insert into Supabase
            // Assuming 'registrations' table has columns: full_name, email, phone, college
            const { data, error } = await supabase
                .from('registrations')
                .insert([
                    {
                        full_name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        college: formData.college,
                        selected_event: formData.selectedEvent,
                        gender: formData.gender
                    }
                ])
                .select();

            if (error) throw error;

            setStatus({ type: 'success', message: 'Registration successful! Opening WhatsApp to send your confirmation...' });
            
            const regId = data && data.length > 0 ? data[0].id : null;
            setRegisteredData({ ...formData, id: regId });
            
            // WhatsApp Redirection Logic
            const phoneStr = "919447217461"; 
            const officialPhone = "919447217461"; 
            const message = `Hello \u00B5Phoria Team! \n\nI just registered for the Tech Fest.\n\n*Name:* ${formData.fullName}\n*Event:* ${formData.selectedEvent}\n*Record ID:* ${regId || 'N/A'}\n\nPlease confirm my entry pass!\n\n*(Note: Here is my digital pass link: https://quickchart.io/qr?text=${encodeURIComponent(regId || 'N/A')}&size=200 )*`;
            const whatsappUrl = `https://wa.me/${officialPhone}?text=${encodeURIComponent(message)}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);

            setFormData({ fullName: '', email: '', phone: '', college: '', selectedEvent: 'Code Debugging', gender: 'Prefer not to say' });
        } catch (error) {
            console.error('Registration Error:', error);
            // Fallback for demo purposes if Supabase is unconfigured
            if (error.message && error.message.includes('placeholder')) {
                // simulated success if env vars aren't set
                setStatus({ type: 'success', message: 'Registration simulated (config not set up). Opening WhatsApp to send your confirmation...' });
                setRegisteredData({ ...formData, id: 'DEMO' });
                
                // WhatsApp Redirection Logic (Fallback)
                const officialPhoneDemo = "919447217461"; 
                const messageDemo = `Hello \u00B5Phoria Team! \n\nI just registered for the Tech Fest.\n\n*Name:* ${formData.fullName}\n*Event:* ${formData.selectedEvent}\n*Record ID:* DEMO\n\nPlease confirm my entry pass!\n\n*(Note: Here is my digital pass link: https://quickchart.io/qr?text=DEMO&size=200 )*`;
                const whatsappUrlDemo = `https://wa.me/${officialPhoneDemo}?text=${encodeURIComponent(messageDemo)}`;
                
                setTimeout(() => {
                    window.open(whatsappUrlDemo, '_blank');
                }, 1000);

                setFormData({ fullName: '', email: '', phone: '', college: '', selectedEvent: 'Code Debugging', gender: 'Prefer not to say' });
            } else {
                setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again later.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="register" className="registration-section">
            <div className="registration-container glass">
                <div className="registration-header">
                    <h2>Secure Your <span className="text-gradient">Spot</span></h2>
                    <p>Don't miss out on the biggest tech fest of the year.</p>
                </div>

                {registeredData ? (
                    <Ticket
                        registrationData={registeredData}
                        onReset={() => {
                            setRegisteredData(null);
                            setStatus({ type: '', message: '' });
                        }}
                    />
                ) : (
                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+91 9876543210"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="college">College / Organization</label>
                            <input
                                type="text"
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                placeholder="Example University"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selectedEvent">Event Selection</label>
                            <select
                                id="selectedEvent"
                                name="selectedEvent"
                                value={formData.selectedEvent}
                                onChange={handleChange}
                                required
                                className="styled-select"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '1rem'
                                }}
                            >
                                <option value="Code Debugging" style={{ background: '#0a0a0a' }}>Code Debugging (₹150)</option>
                                <option value="UI/UX Design Challenge" style={{ background: '#0a0a0a' }}>UI/UX Design Challenge (₹350)</option>
                                <option value="Cyber Security CTF" style={{ background: '#0a0a0a' }}>Cyber Security CTF (₹699)</option>
                                <option value="Robotics Expo" style={{ background: '#0a0a0a' }}>Robotics Expo (FREE)</option>
                            </select>
                        </div>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Register Now'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Registration;
