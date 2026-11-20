// frontend/src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SoilInput from './pages/SoilInput';
import CropInfo from './pages/CropInfo';
import Results from './pages/Results';
import MarketPrices from './pages/MarketPrices';
import PestAlerts from './pages/PestAlerts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Public information pages */}
          <Route path="crop-info" element={<CropInfo />} />
          <Route path="market-prices" element={<MarketPrices />} />
          <Route path="pest-alerts" element={<PestAlerts />} />

          {/* Protected farmer pages */}
          <Route
            path="soil-input"
            element={
              <ProtectedRoute>
                <SoilInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Robust route aliases and redirects */}
          <Route path="crops" element={<Navigate to="/crop-info" replace />} />
          <Route path="crop-guide" element={<Navigate to="/crop-info" replace />} />
          <Route path="market" element={<Navigate to="/market-prices" replace />} />
          <Route path="prices" element={<Navigate to="/market-prices" replace />} />
          <Route path="pests" element={<Navigate to="/pest-alerts" replace />} />
          <Route path="alerts" element={<Navigate to="/pest-alerts" replace />} />
          <Route path="soil" element={<Navigate to="/soil-input" replace />} />
          <Route path="advisory" element={<Navigate to="/soil-input" replace />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />

          {/* Catch-all 404 inside layout with navigation */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
