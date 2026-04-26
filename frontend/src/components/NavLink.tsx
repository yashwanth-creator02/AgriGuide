// frontend/src/components/NavLink.tsx

import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface NavLinkProps {
  to: string;
  label: string;
}

function NavLink({ to, label }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
        'hover:bg-green-50 hover:text-green-700',
        isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600'
      )}
    >
      {label}

      {/* subtle active indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-green-600 rounded-full" />
      )}
    </Link>
  );
}

export default NavLink;
