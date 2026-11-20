// frontend/src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '@/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  if (!isLoggedIn()) {
    // Preserve the intended destination so Login can redirect back after authentication
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
