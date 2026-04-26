// frontend/src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
