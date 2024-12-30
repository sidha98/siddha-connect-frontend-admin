import React, { useState } from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavGroup,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBarChart,
  cilCreditCard,
  cilGraph,
  cilVector,
  cilViewQuilt,
  cilLockLocked,
} from '@coreui/icons';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useNavigate } from 'react-router-dom';
import siddha_corp_logo from '../../../../src/assets/img/siddha_corp_crop_.png';
import siddha_logo_mark from '../../../assets/img/siddha-logo.png';
import { FcBullish, FcLineChart, FcPrivacy, FcComboChart, FcSalesPerformance, FcTemplate, FcGenealogy    } from "react-icons/fc";

import './style.scss';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirection

  return (
    <CSidebar
      unfoldable
      className={`border-end ${isHovered ? '' : 'collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          {isHovered ? (
            <img className="siddha-corp-logo" src={siddha_corp_logo} alt="Siddha Corp Logo" />
          ) : (
            <img className="siddha-logo-mark" src={siddha_logo_mark} alt="Siddha Logo Mark" />
          )}
        </CSidebarBrand>
        {/* Toggler Button */}
        <CSidebarToggler onClick={toggleSidebar} />
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Reports</CNavTitle>
        <CNavItem href="/brand-comparison">
            <FcComboChart  size={20} className="nav-icon" /> Sales Dashboard
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              {/* <CIcon customClassName="nav-icon" icon={cilVector} /> Extraction Dashboard */}
                <FcGenealogy  size={20} className="nav-icon" /> Extraction Dashboard
            </>
          }
        >
          <CNavItem href="/extraction-overview">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Overview
          </CNavItem>
          <CNavItem href="/extraction-graphs">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Graphs
          </CNavItem>
          <CNavItem href="/extraction-report">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Detailed report
          </CNavItem>
          <CNavItem href="/extraction-model-wise">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Model Wise report
          </CNavItem>
        </CNavGroup>

        <CNavGroup
          toggler={
            <>
              {/* <CIcon customClassName="nav-icon" icon={cilCreditCard} /> Finance Dashboard */}
              <FcSalesPerformance  size={20} className="nav-icon" /> Finance Dashboard
            </>
          }
        >
          <CNavItem href="/finance">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Dashboard
          </CNavItem>
          <CNavItem href="/products">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Products
          </CNavItem>
          <CNavItem href="/orders">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            Orders
          </CNavItem>
        </CNavGroup>

        <CNavItem href="/segment-analysis">
          {/* <CIcon customClassName="nav-icon" icon={cilGraph} /> Pulse Dashboard */}
          <FcLineChart size={20} className="nav-icon" /> Pulse Dashboard
        </CNavItem>
        <CNavItem href="/segment-analysis">
          {/* <CIcon customClassName="nav-icon" icon={cilViewQuilt} /> GFK Dashboard */}
          <FcTemplate  size={20} className="nav-icon" /> GFK Dashboard
        </CNavItem>
        <CNavItem href="/logout">
          {/* <CIcon customClassName="nav-icon" icon={cilLockLocked} /> Logout */}
          <FcPrivacy  size={20} className="nav-icon" /> Logout
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
