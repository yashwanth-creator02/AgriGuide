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
        'text-sm font-medium transition-colors hover:text-green-700',
        isActive ? 'text-green-700 font-semibold' : 'text-muted-foreground'
      )}
    >
      {label}
    </Link>
  );
}

export default NavLink;
