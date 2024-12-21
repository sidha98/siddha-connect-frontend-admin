import React from 'react';
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav, CNavItem, CNavTitle, CNavGroup, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBarChart, cilCreditCard, cilGraph, cilVector, cilViewQuilt, cilLockLocked } from '@coreui/icons';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const navigate = useNavigate(); // useNavigate hook for redirection


    return (
        <CSidebar unfoldable className={`border-end ${isSidebarOpen ? '' : 'collapsed'}`}>
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>SC</CSidebarBrand>
                {/* Toggler Button */}
                <CSidebarToggler onClick={toggleSidebar} />
            </CSidebarHeader>
            <CSidebarNav>
                <CNavTitle>Reports</CNavTitle>
                <CNavItem href="/brand-comparison">
                    <CIcon customClassName="nav-icon" icon={cilBarChart} /> Sales Dashboard
                </CNavItem>
                <CNavItem href="/dealer-performance">
                    <CIcon customClassName="nav-icon" icon={cilCreditCard} /> Finance Dashboard
                </CNavItem>

                <CNavGroup
                    toggler={
                        <>
                            <CIcon customClassName="nav-icon" icon={cilVector} /> Extraction Dashboard
                        </>
                    }
                >
                    <CNavItem href="/extraction-overview">
                        <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Overview
                    </CNavItem>
                    <CNavItem href="/extraction-graphs">
                        <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Graphs
                    </CNavItem>
                    <CNavItem href="/extraction-report">
                        <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Detailed report
                    </CNavItem>
                    <CNavItem href="/extraction-model-wise">
                        <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Model Wise report
                    </CNavItem>
                </CNavGroup>

                <CNavItem href="/segment-analysis">
                    <CIcon customClassName="nav-icon" icon={cilGraph} /> Pulse Dashboard
                </CNavItem>
                <CNavItem href="/segment-analysis">
                    <CIcon customClassName="nav-icon" icon={cilViewQuilt} /> GFK Dashboard
                </CNavItem>
                <CNavItem href="/logout">
                    <CIcon customClassName="nav-icon" icon={cilLockLocked} /> Logout
                </CNavItem>

                
            </CSidebarNav>
        </CSidebar>
    );
}

export default Sidebar;
