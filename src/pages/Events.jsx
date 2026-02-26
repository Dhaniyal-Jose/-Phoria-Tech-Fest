import { Calendar, Clock, MapPin, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

// Using local AI generated images if available, or placeholder falls back
const eventsData = [
    {
        id: 1,
        title: 'Code Debugging',
        category: 'Competition',
        image: 'file:///C:/Users/dhani/.gemini/antigravity/brain/a2b3477b-2560-44c7-860f-b936b7bcc7d1/event_hackathon_1772093100056.png',
        time: '10:00 AM - 12:00 PM',
        location: 'Lab 1, Main Block',
        price: '₹150',
        description: 'Test your problem-solving skills in our flagship debugging competition. Find and fix logical errors in complex codebases across multiple languages.'
    },
    {
        id: 2,
        title: 'Cyber Security CTF',
        category: 'Hackathon',
        image: 'file:///C:/Users/dhani/.gemini/antigravity/brain/a2b3477b-2560-44c7-860f-b936b7bcc7d1/event_cyber_ctf.png',
        time: '1:00 PM - 5:00 PM',
        location: 'Auditorium',
        price: '₹699',
        description: 'Dive into the world of ethical hacking. Solve cryptography puzzles, exploit vulnerabilities, and capture the flag before time runs out.'
    },
    {
        id: 3,
        title: 'Robotics Expo',
        category: 'Exhibition',
        image: 'file:///C:/Users/dhani/.gemini/antigravity/brain/a2b3477b-2560-44c7-860f-b936b7bcc7d1/event_ai_robotics_1772093067806.png',
        time: 'All Day',
        location: 'Courtyard',
        price: 'FREE',
        description: 'Witness the future with live demonstrations of autonomous drones, robotic arms, and AI-driven mechanical systems built by top engineering teams.'
    },
    {
        id: 4,
        title: 'UI/UX Design Challenge',
        category: 'Design',
        image: 'file:///C:/Users/dhani/.gemini/antigravity/brain/a2b3477b-2560-44c7-860f-b936b7bcc7d1/event_ui_design.png',
        time: '11:00 AM - 3:00 PM',
        location: 'Design Studio',
        price: '₹350',
        description: 'Showcase your creativity in our rapid-prototyping challenge. Design a beautiful, functional interface for a next-gen tech product from scratch.'
    }
];

const Events = () => {
    const navigate = useNavigate();
    return (
        <div className="events-page">
            <div className="events-header-section">
                <h1>Featured <span className="text-gradient">Events</span></h1>
                <p>Explore the competitions, hackathons, and exhibitions lined up for µPhoria Tech Fest.</p>
            </div>

            <div className="events-grid-container">
                <div className="events-grid">
                    {eventsData.map((event) => (
                        <div key={event.id} className="event-card glass">
                            <div className="event-image-container">
                                <img src={event.image} alt={event.title} className="event-image"
                                    onError={(e) => {
                                        // Fallback if local AI generation image path fails (i.e image not copied to public)
                                        e.target.src = `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800`;
                                    }}
                                />
                                <span className="event-category badge">{event.category}</span>
                            </div>

                            <div className="event-content">
                                <h3>{event.title}</h3>
                                <p className="event-description">{event.description}</p>

                                <div className="event-meta">
                                    <div className="meta-item">
                                        <Clock size={16} />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={16} />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <button className="btn btn-secondary register-btn" onClick={() => {
                                    navigate('/#register');
                                    // Small delay to ensure navigation completes before scrolling
                                    setTimeout(() => {
                                        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}>
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
