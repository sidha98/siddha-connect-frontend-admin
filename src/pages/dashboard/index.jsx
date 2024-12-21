import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function Dashboard({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Manage open/collapsed state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by verifying the token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);  // User is logged in
        } else {
            setIsLoggedIn(false);  // User is not logged in
            navigate("/login");    // Redirect to login page if not logged in
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar state
    };

    return (
        <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {isLoggedIn && ( // Only render the sidebar if the user is logged in
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}
            <div className="main-content">
                {children}
            </div>
        </div>
    );
}

export default Dashboard;
