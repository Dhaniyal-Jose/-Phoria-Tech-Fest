import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import './Location.css';

const Location = () => {
    return (
        <section id="location" className="location-section">
            <div className="location-container">
                <div className="location-header">
                    <h2>Event <span className="text-gradient">Venue</span></h2>
                    <p>Find out where the magic happens and join us for an unforgettable experience.</p>
                </div>

                <div className="location-content glass">
                    <div className="location-info">
                        <div className="venue-details">
                            <div className="venue-icon">
                                <MapPin color="var(--accent-1)" size={32} />
                            </div>
                            <div>
                                <h3>Inker Robotics</h3>
                                <p className="venue-address">
                                    4th floor, Shoranur Rd, above HDFC Bank<br />
                                    Naikkanal, Thrissur, Kerala 680001
                                </p>
                            </div>
                        </div>

                        <div className="location-cta">
                            <a
                                href="https://maps.app.goo.gl/rx88zsQLWGsMH1VEA?g_st=ic"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary cta-button"
                            >
                                <Navigation size={20} style={{ marginRight: '0.5rem' }} />
                                View on Google Maps
                            </a>
                        </div>
                    </div>

                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15740.096378411246!2d76.840618!3d9.507421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b064ebffffffff%3A0x6b4fb6c1f1076b10!2sAmal%20Jyothi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Event Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
