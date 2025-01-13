import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ReactNode } from 'react';

export function PrivateRoute({ children } :{children: ReactNode} ) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/signin" />;
}