import { useState, useEffect } from 'react';
import { Admin } from '../AdminPage';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HeroSection from './HeroSection';

function Dashboard() {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const initialTab = urlParams.get('tab') || 'hero-section';
    const [tab, setTab] = useState(initialTab);

    useEffect(() => {
        const myParam = urlParams.get('tab');
        if (myParam) {
            setTab(myParam);
        }
    }, [location.search]);

    return (
        <div className='md:flex'>
            <div><Admin /></div>
            {currentUser && currentUser?.data?.loggedInUser?.isAdmin && (
                <>
                    {tab === "hero-section" && <HeroSection />}
                    {tab === "about-section" && <div>About Section</div>}
                    {tab === "whyme-section" && <div>Why Me Section</div>}
                    {tab === "intro" && <div>Introduction</div>}
                    {tab === "journey" && <div>Journey</div>}
                    {tab === "projects" && <div>Projects</div>}
                    {tab === "contact" && <div>Contact</div>}
                </>
            )}
        </div>
    )
}

export default Dashboard;
