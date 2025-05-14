import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  role: 'admin' | 'guest';
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/guest'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;