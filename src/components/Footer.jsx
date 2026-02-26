import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--surface-border)',
            marginTop: '4rem',
            color: 'var(--text-secondary)'
        }}>
            <p>&copy; {new Date().getFullYear()} µPhoria Tech Fest. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
