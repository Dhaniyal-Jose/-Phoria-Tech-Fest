import React from 'react';

const About = () => {
    return (
        <section id="about" style={{ padding: '6rem 2rem', position: 'relative' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About <span className="text-gradient">µPhoria</span></h2>

                <div className="glass" style={{ padding: '3rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                    <p>
                        Welcome to <strong style={{ color: 'white' }}>µPhoria Tech Fest</strong>, where passionate minds share ideas worth spreading. A student-organized event bringing together innovators, aspiring developers, and tech enthusiasts.
                    </p>
                    <p>
                        Spanning over 2 adrenaline-filled days on <strong>March 5th & 6th</strong>, the event features keynote sessions, hands-on workshops, competitive coding challenges, and interactive fun games designed to push the boundaries of your creativity and technical prowess.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--surface-border)' }}>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-1)', marginBottom: '0.5rem' }}>2</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Action-packed Days</p>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--surface-border)' }}>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-1)', marginBottom: '0.5rem' }}>15+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Exciting Events</p>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--surface-border)' }}>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-1)', marginBottom: '0.5rem' }}>500+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Participants</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default About;
