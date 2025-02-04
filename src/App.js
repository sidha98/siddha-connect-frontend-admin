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
import Orders from './pages/orders';
import Layout from './pages/layout';
import FinanceDashBoard from './pages/components/financeDashboard';
import TallyVouchers from './pages/tallyVouchers';
import PaymentCalculator from './pages/paymentCalculator';
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ToastContainer } from 'react-toastify';

function AppRoutes() {
    const location = useLocation();
    // const dealerRoutesFinance = [
    //     "/dealer-dashboard/finance",
    //     "/dealer-dashboard/orders/products",
    //     "/products"
    // ];
    
    // const isDealerFinanceDash = dealerRoutesFinance.includes(location.pathname);

    return (
        <Routes>
            {/* Login Page Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes with Layout */}
            <Route
                path="/"
                element={
                    <PrivateRoute
                        element={() => <Layout />} // Layout wraps all protected routes
                    />
                }
            >
                {/* Child Routes */}
                <Route path="/dealer-dashboard/finance" element={<DealerDashboardFinance />} />
                {/* finance Dashboard */}
               <Route path = "/finance-dashboard" element ={<FinanceDashBoard/>}/>
                <Route path="/products" element={<ProductPage />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/brand-comparison" element={<BrandComparison />} />
                <Route path="/dealer-performance" element={<DealerPerformance />} />
                <Route path="/segment-analysis" element={<SegmentAnalysis />} />
                <Route path="/extraction-report" element={<ExtractionReport />} />
                <Route path="/extraction-overview" element={<ExtractionOverview />} />
                <Route path="/extraction-graphs" element={<ExtractionGraphs />} />
                <Route path="/extraction-model-wise" element={<ExtractionModelWise />} />
                <Route path="/finance-dashboard/tally-vouchers" element={<TallyVouchers/>} />
                <Route path="/payment-calculator" element={<PaymentCalculator/>} />
                <Route path="/logout" element={<Logout />} />
            </Route>
        </Routes>
    );
}


function App() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Siddha Connect</title>
                <meta name="description" content="Siddha Connect | Developed by White Cinette" />
                <link rel="icon" type="image/png" href="/sc-favicon.png" />
            </Helmet>

            <AuthProvider>
                <UserProvider>
                    <Router>
                        <AppRoutes />
                        <ToastContainer /> 

                    </Router>
                </UserProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
 