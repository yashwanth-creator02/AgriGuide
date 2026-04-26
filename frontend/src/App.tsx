// frontend/src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
            path="crop-info"
            element={
              <ProtectedRoute>
                <CropInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="market-prices"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="pest-alerts"
            element={
              <ProtectedRoute>
                <PestAlerts />
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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
