import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [typewriterText, setTypewriterText] = useState('');
    const [showAjce, setShowAjce] = useState(false);

    useEffect(() => {
        // Typewriter effect logic
        const fullText = "µPhoria";
        let index = 0;

        // reset
        setTypewriterText('');
        setShowAjce(false);

        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                setTypewriterText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => setShowAjce(true), 500); // slight delay before revealing Tech Fest
            }
        }, 150); // typing speed

        return () => clearInterval(typeInterval);
    }, []);

    useEffect(() => {
        // Target date: March 5, 2026 09:00:00 AM
        const targetDate = new Date('2026-03-05T09:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const scrollToRegister = () => {
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-content">
                <div className="badge">March 5-6, 2026</div>

                {/* Typewriter Title to mimic reference site `<span class="tedx... typewriter"></span><span class="ajce...">...</span>` */}
                <h1 className="hero-typewriter-container">
                    <span className="typewriter-text text-red-600">{typewriterText}</span>
                    <span className={`static-text text-gray-500 ${showAjce ? 'visible' : ''}`}>Tech Fest</span>
                </h1>

                <p className="hero-subtitle">
                    Join us for 2 days of innovation, technology, and ideas worth spreading. Experience the future of tech.
                </p>

                <div className="countdown-container glass">
                    <div className="countdown-item">
                        <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-item">
                        <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-item">
                        <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="countdown-label">Mins</span>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-item">
                        <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="countdown-label">Secs</span>
                    </div>
                </div>

                <div className="hero-actions">
                    <button onClick={scrollToRegister} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
                        Register Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
