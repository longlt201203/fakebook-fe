import React, { useState } from 'react';
import './AdminDashboard.css';
import { DashboardSection } from './dashboard-section';
import { UserManagementSection } from './sections/UserManagementSection';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import { Role } from '../../utils/Role';
import { useNavigate } from 'react-router-dom';

const sections: Array<DashboardSection> = [
    {
        title: "User Management",
        element: ({ accessToken }) => <UserManagementSection accessToken={accessToken} />
    }
];

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile, accessToken] = useCheckProfile({ roles: [Role.ADMIN] });
    const [activeSection, setActiveSection] = useState<DashboardSection>();

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logging out...');

        window.localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <h2>Fakebook Admin</h2>
                <nav>
                    <ul>
                        {sections.map((item, index) => (<li key={index} onClick={() => setActiveSection(item)}>User Management</li>))}
                        <li onClick={() => handleLogout()}>Logout</li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-content">
                <h3>{activeSection ? activeSection.title : 'Welcome to the Admin Dashboard'}</h3>
                {activeSection ? activeSection.element({ accessToken }) : <p>Select a section from the sidebar to get started.</p>}
            </main>
        </div>
    );
};

export default AdminDashboard;
