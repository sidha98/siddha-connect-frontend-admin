import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { AppBar, Toolbar, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import siddha_logo from '../../assets/img/siddha_corp_crop_.png';
import DealerInfoForHeader from '../components/dealerInfoForHeader';
import { FcInTransit, FcSmartphoneTablet, FcBusinessman, FcLock, FcComboChart, FcSalesPerformance, FcTemplate, FcGenealogy, FcNext } from "react-icons/fc";


const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <FcTemplate style={{ fontSize: '24px' }} /> },
  { segment: 'sales-dashboard', title: 'Sales Dashboard', icon: <FcComboChart style={{ fontSize: '24px' }} /> },
  {
    segment: 'finance-dashboard',
    title: 'Finance Dashboard',
    icon:  <FcSalesPerformance style={{ fontSize: '24px' }} />,
    children: [
      {
        segment: '',
        title: 'Home',
        icon: <FcNext />,
      },
      {
        segment: 'payment-calculator',
        title: 'Payment Calculator',
        icon: <FcNext />,
      },
      {
        segment: 'sales',
        title: 'Credit Note',
        icon: <FcNext />,
      },
      {
        segment: 'traffic',
        title: 'Debit Note',
        icon: <FcNext />,
      },
      {
        segment: 'tally-vouchers',
        title: 'Vouchers',
        icon: <FcNext />,
      },
    ],
  },
  { segment: 'products', title: 'Extraction Dashboard', icon: <FcGenealogy style={{ fontSize: '24px' }} /> },

  { segment: 'products', title: 'Products', icon: <FcSmartphoneTablet style={{ fontSize: '24px' }} /> },
  { segment: 'orders', title: 'Orders', icon: <FcInTransit style={{ fontSize: '24px' }} /> },
  { segment: 'profile', title: 'Profile', icon: <FcBusinessman style={{ fontSize: '24px' }} /> },
  { segment: 'logout', title: 'Logout', icon: <FcLock style={{ fontSize: '24px' }} /> },

];

// Custom Header Component
// function CustomHeader() {
//   return (
//     <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//       <Toolbar>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginRight: 2, // Adjust spacing as needed
//           }}
//         >
//           <img
//             src={siddha_logo}
//             alt="Siddha Corporation Logo"
//             style={{ height: '40px' }}
//           />
//           <Typography variant="caption" color="inherit">
//             Excellence in Service
//           </Typography>
//         </Box>
//         <Typography variant="h6" color="inherit" noWrap>
//           Siddha Corporation
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

function CustomHeader() {
  return (
    <Stack direction="row" spacing={2}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 2, // Adjust spacing as needed
          }}
        >
          <img
            src=""
            alt="Siddha Corporation Logo"
            style={{ height: '40px' }}
          />
          <Typography variant="caption" color="inherit">
            Excellence in Service
          </Typography>
        </Box>
        <Typography variant="h6" color="inherit" noWrap>
          Siddha Corporation
        </Typography>
      </Toolbar>
    <DealerInfoForHeader />
    </Stack>
  );
}




// Toolbar Actions Component
function ToolbarActions() {
  return (
    <Stack direction="row" spacing={2}>
      <DealerInfoForHeader />
    </Stack>
  );
}

// Sidebar Footer Component
function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center' }}
    >
      {mini ? '© Siddha' : `© ${new Date().getFullYear()} Siddha Corporation`}
    </Typography>
  );
}

export default function Layout() {
  return (
    <AppProvider 
    branding={{
      logo: <img src={siddha_logo} alt="MUI logo" />,
      title: <>
      </>,
      homeUrl: '/toolpad/core/introduction',
    }}
    navigation={NAVIGATION}>
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          header: CustomHeader, // Use custom header
          toolbarActions: ToolbarActions, // Add toolbar actions
          sidebarFooter: SidebarFooter, // Custom footer for the sidebar
        }}
      >
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
