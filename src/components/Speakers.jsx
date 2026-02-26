import React from 'react';

const speakersData = [
    {
        name: 'Dr. Anil Kumar R',
        title: 'Professor & Head, Dept of CS',
        company: 'XYZ College of Engineering',
        session: 'Inaugural Address & Future of AI',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Ms. Neha Menon',
        title: 'Senior Software Engineer',
        company: 'Infosys',
        session: 'Web Development Trends 2026',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Mr. Arjun Nair',
        title: 'Founder & CEO',
        company: 'TechNova Solutions',
        session: 'Startup Journey & Entrepreneurship',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Mr. Rahul Thomas',
        title: 'AI/ML Engineer',
        company: 'TCS',
        session: 'Building AI Applications in Real World',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Ms. Meera Joseph',
        title: 'Full Stack Developer',
        company: 'UST Global',
        session: 'Modern Backend with Supabase',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Dr. Priya Mathew',
        title: 'Industry Consultant & Researcher',
        company: 'Kerala Startup Mission',
        session: 'Industry vs Academia',
        image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Mr. Vivek S',
        title: 'Cyber Security Analyst',
        company: 'EY (Ernst & Young)',
        session: 'Cyber Security Awareness',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
        name: 'Faculty Coordinators & Mentors',
        title: 'Event Mentors & Judges',
        company: 'µPhoria Organizing Committee',
        session: 'Project Presentation & Technical Quiz',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=400'
    }
];

const Speakers = () => {
    return (
        <section id="speakers" style={{ padding: '6rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Featured <span className="text-gradient">Speakers</span></h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.125rem' }}>Learn from industry experts, researchers, and visionaries.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {speakersData.map((speaker, idx) => (
                        <div key={idx} style={{ padding: '2rem', border: '1px solid var(--surface-border)', transition: 'transform 0.3s ease, border-color 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--accent-1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--surface-border)'; }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '3px solid var(--accent-1)' }}>
                                <img src={speaker.image} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{speaker.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{speaker.title}</p>
                            <p style={{ color: 'var(--accent-1)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>{speaker.company}</p>
                            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem', width: '100%', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.875rem', color: '#fff' }}><strong>SESSION</strong><br />{speaker.session}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;
