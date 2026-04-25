// frontend/src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SoilInput from './pages/SoilInput';
import CropInfo from './pages/CropInfo';
import Results from './pages/Results';
import MarketPrices from './pages/MarketPrices';
import PestAlerts from './pages/PestAlerts';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="soil-input" element={<SoilInput />} />
          <Route path="crop-info" element={<CropInfo />} />
          <Route path="results" element={<Results />} />
          <Route path="market-prices" element={<MarketPrices />} />
          <Route path="pest-alerts" element={<PestAlerts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
