import React, { forwardRef } from 'react';
import './CertificateTemplate.css';

const CertificateTemplate = forwardRef(({ name, event, date }, ref) => {
    // Current date if no date provided
    const displayDate = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

    return (
        <div ref={ref} className="certificate-container">
            <div className="certificate-border-outer">
                <div className="certificate-border-inner">

                    <div className="certificate-header">
                        <h1 className="cert-title">uPhoria Tech Fest</h1>
                        <h2 className="cert-subtitle">Certificate of Participation</h2>
                    </div>

                    <div className="certificate-body">
                        <p className="cert-text">This is to certify that</p>
                        <h3 className="cert-name">{name || 'Participant Name'}</h3>
                        <p className="cert-text">
                            has successfully participated in the event
                        </p>
                        <h4 className="cert-event">{event || 'Tech Event'}</h4>
                        <p className="cert-text">
                            held as part of the uPhoria Tech Fest symposium.
                        </p>
                    </div>

                    <div className="certificate-footer">
                        <div className="cert-date">
                            <span className="footer-label">Date:</span>
                            <span className="footer-value">{displayDate}</span>
                            <div className="footer-line"></div>
                        </div>

                        <div className="cert-signature-block">
                            {/* Placeholder for actual signature image */}
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Stylized_signature_sample.svg"
                                alt="Signature"
                                className="cert-signature-img"
                                crossOrigin="anonymous"
                            />
                            <div className="footer-line"></div>
                            <span className="footer-label">Event Coordinator</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default CertificateTemplate;
