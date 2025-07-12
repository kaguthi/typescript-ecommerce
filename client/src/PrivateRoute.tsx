import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

export function PrivateRoute({ children } :{children: ReactNode} ) {
  const { token, loading } = useAuth();
  if (loading) return 
    <div className='flex items-center justify-center h-screen'>
      <LoaderCircle className='animate-spin size-14' />
    </div>;
  return token ? <>{children}</> : <Navigate to="/signin" />;
}