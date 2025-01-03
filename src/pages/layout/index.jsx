import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppBar, Toolbar, Typography, IconButton, Stack, Tooltip } from '@mui/material';
// import ThemeSwitcher from '@toolpad/core/ThemeSwitcher';
import SearchIcon from '@mui/icons-material/Search';
import siddha_logo from '../../assets/img/siddha_corp_crop_.png';
import DealerInfoForHeader from '../components/dealerInfoForHeader';

const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'products', title: 'Products', icon: <BarChartIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
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
