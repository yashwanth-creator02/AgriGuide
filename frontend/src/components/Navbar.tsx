// frontend/src/components/Navbar.tsx

import { Link } from 'react-router-dom';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Advisory', path: '/advisory' },
  { label: 'Soil Input', path: '/soil-input' },
  { label: 'Crop Info', path: '/crop-info' },
  { label: 'Results', path: '/results' },
  { label: 'Market Prices', path: '/market-prices' },
  { label: 'Pest Alerts', path: '/pest-alerts' },
];

function Navbar() {
  return (
    <nav className="w-full bg-green-700 text-white px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold">AgriGuide</span>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="hover:underline text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
