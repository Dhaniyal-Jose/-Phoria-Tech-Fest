import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const isHome = location.pathname === '/';

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="text-gradient font-heading" style={{ fontSize: '1.5rem', fontWeight: 800 }}>µPhoria</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-menu">
                    {isHome ? (
                        <>
                            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
                            <Link to="/events" className="nav-link">Events</Link>
                            <button onClick={() => scrollToSection('speakers')} className="nav-link">Speakers</button>
                            <button onClick={() => scrollToSection('feedback')} className="nav-link">Feedback</button>
                            <button onClick={() => scrollToSection('register')} className="btn btn-primary">Register Now</button>
                        </>
                    ) : (
                        <>
                            <Link to="/events" className="nav-link">Events</Link>
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
                        </>
                    )}
                    <Link to="/admin" className="nav-link text-secondary">Admin</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle desktop-hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu glass">
                    <div className="mobile-links">
                        {isHome ? (
                            <>
                                <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className="nav-link">About</button>
                                <Link to="/events" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
                                <button onClick={() => { scrollToSection('speakers'); setIsMobileMenuOpen(false); }} className="nav-link">Speakers</button>
                                <button onClick={() => { scrollToSection('feedback'); setIsMobileMenuOpen(false); }} className="nav-link">Feedback</button>
                                <button onClick={() => { scrollToSection('register'); setIsMobileMenuOpen(false); }} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register Now</button>
                            </>
                        ) : (
                            <>
                                <Link to="/events" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
                                <Link to="/" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Back to Home</Link>
                            </>
                        )}
                        <Link to="/admin" className="nav-link" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
