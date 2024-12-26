// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext'; // Import the Auth context
import Dashboard from './pages/dashboard';
import BrandComparison from './pages/components/brandComparison';
import DealerPerformance from './pages/components/dealerPerformance';
import SegmentAnalysis from './pages/components/segmentAnalysis';
import ExtractionReport from './pages/extractionReport';
import ExtractionOverview from './pages/extractionOverview';
import Login from './pages/login';
import PrivateRoute from './pages/components/privateRoute'; // Import the PrivateRoute component
import Logout from './pages/logout';
import ExtractionGraphs from './pages/extractionGraphs';
import ExtractionModelWise from './pages/extractionModelWise';
import DealerDashboardFinance from './pages/dealerDashboardFinance';
import ProductPage from './pages/dealerDashboardFinance/orders/productPage';
import { UserProvider } from './context/userContext';


function AppRoutes() {
    const location = useLocation();
    const dealerRoutesFinance = [
        "/dealer-dashboard/finance",
        "/dealer-dashboard/orders/products",
        "/dealer-dashboard/finance/orders/products/som"
    ];
    
    const isDealerFinanceDash = dealerRoutesFinance.includes(location.pathname);

    return (
        <>
        {isDealerFinanceDash ? (
            <DealerDashboardFinance>
                <Routes>
                    <Route path="/dealer-dashboard/finance" element={<PrivateRoute element={DealerDashboardFinance} />} />
                    <Route path="/dealer-dashboard/orders/products" element={<PrivateRoute element={ProductPage} /> } />
                </Routes>
            </DealerDashboardFinance>
        ) : (
            <Dashboard>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dealer-dashboard/finance" element={<PrivateRoute element={ DealerDashboardFinance } />} />
                    <Route path="/brand-comparison" element={<PrivateRoute element={BrandComparison} />} />
                    <Route path="/dealer-performance" element={<PrivateRoute element={DealerPerformance} />} />
                    <Route path="/segment-analysis" element={<PrivateRoute element={SegmentAnalysis} />} />
                    <Route path="/extraction-report" element={<PrivateRoute element={ExtractionReport} />} />
                    <Route path="/extraction-overview" element={<PrivateRoute element={ExtractionOverview} />} />
                    <Route path="/extraction-graphs" element={<PrivateRoute element={ExtractionGraphs} />} />
                    <Route path="/extraction-model-wise" element={<PrivateRoute element={ExtractionModelWise} /> } />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Dashboard>
        )}
        </>
    )
}


function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
