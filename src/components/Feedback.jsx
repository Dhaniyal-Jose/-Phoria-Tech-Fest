import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, Send } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', text: '' });

        try {
            const { error } = await supabase
                .from('feedbacks')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                        // created_at is strictly automatic by the database schema
                    }
                ]);

            if (error) throw error;

            setStatus({ type: 'success', text: 'Thank you for your feedback! We appreciate it.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Feedback Error:', error);
            // Fallback for demo mode
            if (error.message && error.message.includes('placeholder')) {
                setStatus({ type: 'success', text: 'Thank you for your feedback! (Simulated Mode)' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', text: 'Something went wrong submitting your feedback. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="feedback" className="feedback-section">
            <div className="feedback-container glass">
                <div className="feedback-header">
                    <MessageSquare size={32} color="var(--accent-1)" style={{ marginBottom: '1rem' }} />
                    <h2>We Value Your <span className="text-gradient">Feedback</span></h2>
                    <p>Have ideas or questions about µPhoria Tech Fest? Let us know!</p>
                </div>

                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group row">
                        <div className="field-half">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Jane Doe"
                                disabled={status.type === 'success'}
                            />
                        </div>
                        <div className="field-half">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="jane@example.com"
                                disabled={status.type === 'success'}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="What's on your mind?"
                            rows={4}
                            disabled={status.type === 'success'}
                        />
                    </div>

                    {status.text && (
                        <div className={`status-message ${status.type}`}>
                            {status.text}
                        </div>
                    )}

                    {!status.type || status.type === 'error' ? (
                        <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : (
                                <>
                                    <Send size={18} style={{ marginRight: '0.5rem' }} />
                                    Send Feedback
                                </>
                            )}
                        </button>
                    ) : null}
                </form>
            </div>
        </section>
    );
};

export default Feedback;
