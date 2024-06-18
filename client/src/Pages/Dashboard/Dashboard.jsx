import { useState, useEffect } from 'react';
import { Admin } from '../AdminPage';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HeroSection from './HeroSection';
import Introduction from './Introduction';
import SocialMedia from './SocialMedia';
import Skill from './Skills';
import { Projects } from './Projects/Projects';
import CreateProjects from './Projects/CreateProjects';
import UpdateProject from './Projects/UpdateProject';
import CreateExperience from './Experience/CreateExperience';
import CreateEducation from './Education/CreateEducation';
import CreateCertificate from './Certificate/CreateCertificate';
import { EducationList } from './Education/EducationList';
import UpdateEducation from './Education/UpdateEducation';
import { ExperienceList } from './Experience/ExperienceList';
import UpdateExperience from './Experience/UpdateExperience';
import { CertificateList } from './Certificate/CertificateList';
import UpdateCertificate from './Certificate/UpdateCertificate';


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
                    {tab === "intro" && <Introduction />}
                    {tab === "skills" && <Skill />}
                    {tab === "social" && <SocialMedia />}
                    {tab === "experience" && <ExperienceList/>}
                    {tab === "education" && <EducationList />}
                    {tab === "projects" && <Projects />}
                    {tab === "createProjects" && <CreateProjects/>}
                    {tab === "createExperience" && <CreateExperience />}
                    {tab === "createEducation" && <CreateEducation />}
                    {tab === 'createCertificate' && <CreateCertificate />}
                    {tab==="updateProjects" && <UpdateProject />}
                    {tab === "updateExperience" && <UpdateExperience />}
                    {tab === "updateEducation" && <UpdateEducation />}
                    {
                        tab === "certificate" && <CertificateList />
                    }
                    {tab === "updateCertificate" && <UpdateCertificate />}
                </>
            )}
        </div>
    )
}

export default Dashboard;
