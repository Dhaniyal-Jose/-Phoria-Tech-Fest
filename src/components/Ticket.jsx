import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Copy, Check, FileDown } from 'lucide-react';
import './Ticket.css';

const Ticket = ({ registrationData, onReset }) => {
    const ticketRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // The unique identifier for the ticket (could be the Supabase ID, or a mix of data)
    // We'll use the ID if we have it, else fallback to a combo of email/phone
    const ticketId = registrationData.id
        ? `UPHORIA-26-TKT-${registrationData.id}`
        : `UPHORIA-26-TKT-${registrationData.phone.slice(-4)}-${Date.now().toString().slice(-4)}`;

    const handleCopyId = () => {
        navigator.clipboard.writeText(ticketId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadImage = async () => {
        if (!ticketRef.current || isDownloading) return;

        setIsDownloading(true);
        try {
            // Give a small delay in case fonts/images need to settle
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(ticketRef.current, {
                scale: 2, // Higher quality
                backgroundColor: '#0a0a0a', // Match our dark theme
                logging: false,
                useCORS: true
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `uPhoria-Ticket-${registrationData.fullName.replace(/\s+/g, '-')}.png`;
            link.click();
        } catch (error) {
            console.error("Failed to generate image ticket:", error);
            alert("Sorry, there was an issue generating your ticket image.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!ticketRef.current || isDownloading) return;

        setIsDownloading(true);
        try {
            const canvas = await html2canvas(ticketRef.current, {
                scale: 2,
                backgroundColor: '#0a0a0a',
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');

            // Generate PDF (A4 size roughly matches our ticket aspect ratio closely enough for this demo, 
            // but we'll size it custom to fit the exact canvas dimensions to look like a real ticket)
            const pdf = new jsPDF({
                orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`uPhoria-Ticket-${registrationData.fullName.replace(/\s+/g, '-')}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF ticket:", error);
            alert("Sorry, there was an issue generating your ticket PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="ticket-success-container fade-in">
            <div className="ticket-header">
                <h3><span className="text-gradient">Awesome!</span> You're in.</h3>
                <p>Here is your official dynamic pass for µPhoria Tech Fest.</p>
            </div>

            {/* The actual ticket element that will be captured */}
            <div className="ticket-wrapper">
                <div className="ticket glass" ref={ticketRef}>
                    <div className="ticket-left">
                        <div className="ticket-branding">
                            <span className="text-gradient font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>µPhoria</span>
                            <span className="ticket-year">2026</span>
                        </div>

                        <div className="ticket-attendee-info">
                            <div className="info-group">
                                <label>ATTENDEE</label>
                                <h4>{registrationData.fullName || 'Guest User'}</h4>
                            </div>
                            <div className="info-group">
                                <label>ORGANIZATION</label>
                                <h4>{registrationData.college || 'Independent'}</h4>
                            </div>

                            <div className="info-row">
                                <div className="info-group">
                                    <label>DATE</label>
                                    <p>March 5-6</p>
                                </div>
                                <div className="info-group">
                                    <label>VENUE</label>
                                    <p>Inker Robotics, Thrissur</p>
                                </div>
                                <div className="info-group">
                                    <label>ACCESS</label>
                                    <p className="highlight">{(registrationData.selectedEvent ? registrationData.selectedEvent.replace(/\s*\(.*?\)\s*/g, '').toUpperCase() : 'ALL EVENTS')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ticket-divider"></div>

                    <div className="ticket-right">
                        <div className="qr-container">
                            <QRCodeSVG
                                value={ticketId}
                                size={120}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"Q"}
                            />
                        </div>
                        <div className="ticket-id-display" onClick={handleCopyId} title="Click to copy ID">
                            <span className="id-text">{ticketId}</span>
                            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#a1a1aa" />}
                        </div>
                        <p className="scan-text">SCAN AT ENTRY</p>
                    </div>
                </div>
            </div>

            <div className="ticket-actions">
                <button
                    className="btn btn-primary action-btn"
                    onClick={handleDownloadImage}
                    disabled={isDownloading}
                >
                    <Download size={18} />
                    {isDownloading ? 'Processing...' : 'Save as Image'}
                </button>
                <button
                    className="btn btn-secondary action-btn"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                >
                    <FileDown size={18} />
                    {isDownloading ? 'Processing...' : 'Download PDF'}
                </button>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button className="btn nav-link" onClick={onReset} style={{ color: 'var(--text-secondary)' }}>
                    Register Another Person
                </button>
            </div>
        </div>
    );
};

export default Ticket;
