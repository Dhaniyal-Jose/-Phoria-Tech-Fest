import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Schedule.css';

const scheduleData = {
    day1: {
        date: 'March 5',
        venue: 'Main Auditorium & Activity Hall',
        events: [
            { time: '9:00 AM – 9:30 AM', title: 'Registration & Welcome Kit Distribution', description: 'Collect your welcome kits, ID badges, and event schedules. Grab a quick coffee before we begin!', isBreak: false },
            { time: '9:30 AM – 10:00 AM', title: 'Inauguration Ceremony & Welcome Address', description: 'Official kick-off of µPhoria Tech Fest. Featuring the Inaugural Address and Future of AI discussion by Dr. Anil Kumar R.', isBreak: false },
            { time: '10:00 AM – 11:00 AM', title: 'Keynote Session: Future of AI & Innovation', description: 'Deep dive into how AI is shaping the next decade of technology and society.', isBreak: false },
            { time: '11:00 AM – 11:15 AM', title: 'Tea Break', description: 'Refresh and network with peers.', isBreak: true },
            { time: '11:15 AM – 12:30 PM', title: 'Technical Session 1: Web Development Trends 2026', description: 'Led by Ms. Neha Menon, explore the cutting-edge frameworks and paradigms defining the future of the web.', isBreak: false },
            { time: '12:30 PM – 1:30 PM', title: 'Lunch Break', description: 'Enjoy our complimentary catered lunch.', isBreak: true },
            { time: '1:30 PM – 2:30 PM', title: 'Workshop: Modern Backend with Supabase', description: 'Hands-on workshop by Ms. Meera Joseph teaching you how to build fast, scalable backends.', isBreak: false },
            { time: '2:30 PM – 3:30 PM', title: 'Technical Quiz Competition', description: 'Test your knowledge across networking, development, and general tech trivia to win exciting prizes.', isBreak: false },
            { time: '3:30 PM – 3:45 PM', title: 'Break', description: 'Short relaxing break.', isBreak: true },
            { time: '3:45 PM – 5:00 PM', title: '🎮 Fun Games Session', description: 'Unwind with a Treasure Hunt, Coding Relay, and Meme Making Contest!', isBreak: false }
        ]
    },
    day2: {
        date: 'March 6',
        venue: 'Seminar Hall & Open Ground',
        events: [
            { time: '9:30 AM – 10:00 AM', title: 'Recap & Icebreaker Activity', description: 'Quick recap of Day 1 and fun networking games to start the day.', isBreak: false },
            { time: '10:00 AM – 11:00 AM', title: 'Guest Talk: Startup Journey & Entrepreneurship', description: 'Inspiring session by Mr. Arjun Nair sharing his journey of building a successful tech startup.', isBreak: false },
            { time: '11:00 AM – 11:15 AM', title: 'Tea Break', description: 'Refresh and network.', isBreak: true },
            { time: '11:15 AM – 12:30 PM', title: 'Panel Discussion: Industry vs Academia', description: 'Engaging debate featuring Dr. Priya Mathew and other experts discussing bridging the gap in tech education.', isBreak: false },
            { time: '12:30 PM – 1:30 PM', title: 'Lunch Break', description: 'Catered networking lunch.', isBreak: true },
            { time: '1:30 PM – 2:30 PM', title: 'Project Presentation Competition', description: 'Finalists showcase their innovative projects to a panel of expert judges.', isBreak: false },
            { time: '2:30 PM – 3:30 PM', title: '🎯 Outdoor & Team Games', description: 'Head to the Open Ground for Tug of War, Blind Coding Challenge, and Rapid Fire Tech Round.', isBreak: false },
            { time: '3:30 PM – 4:00 PM', title: 'Prize Distribution Ceremony', description: 'Rewarding the winners of all competitions and hackathons.', isBreak: false },
            { time: '4:00 PM – 4:30 PM', title: 'Closing Ceremony & Vote of Thanks', description: 'Official conclusion of µPhoria Tech Fest.', isBreak: false }
        ]
    }
};

const Schedule = () => {
    const [activeTab, setActiveTab] = useState('day1');
    const [expandedEvent, setExpandedEvent] = useState(null);

    const currentDay = scheduleData[activeTab];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedEvent(null); // Reset expanded event when switching days
    };

    const toggleEvent = (idx) => {
        setExpandedEvent(expandedEvent === idx ? null : idx);
    };

    return (
        <section id="schedule" className="schedule-section">
            <div className="schedule-container">
                <h2 className="schedule-title">Event <span className="text-gradient">Schedule</span></h2>

                <div className="schedule-tabs glass">
                    <button
                        className={`tab-btn ${activeTab === 'day1' ? 'active' : ''}`}
                        onClick={() => handleTabChange('day1')}
                    >
                        Day 1 - March 5
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'day2' ? 'active' : ''}`}
                        onClick={() => handleTabChange('day2')}
                    >
                        Day 2 - March 6
                    </button>
                </div>

                <div className="schedule-info glass">
                    <p><strong>🗓 Date:</strong> {currentDay.date}</p>
                    <p><strong>📍 Venue:</strong> {currentDay.venue}</p>
                </div>

                <div className="timeline">
                    {currentDay.events.map((evt, idx) => (
                        <div
                            key={idx}
                            className={`timeline-item glass ${evt.isBreak ? 'break-item' : ''} ${expandedEvent === idx ? 'expanded' : ''}`}
                            onClick={() => !evt.isBreak && toggleEvent(idx)}
                            style={{ cursor: evt.isBreak ? 'default' : 'pointer' }}
                        >
                            <div className="timeline-time">{evt.time}</div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h3 className="timeline-event-title">{evt.title}</h3>
                                    {!evt.isBreak && (
                                        <span className="expand-icon">
                                            {expandedEvent === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </span>
                                    )}
                                </div>
                                {expandedEvent === idx && !evt.isBreak && (
                                    <div className="timeline-description">
                                        <p>{evt.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
