import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Schedule from '../components/Schedule';
import Speakers from '../components/Speakers';
import Registration from '../components/Registration';
import Location from '../components/Location';
import Feedback from '../components/Feedback';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <About />
            <Schedule />
            <Speakers />
            <Registration />
            <Feedback />
            <Location />
        </div>
    );
};

export default LandingPage;
