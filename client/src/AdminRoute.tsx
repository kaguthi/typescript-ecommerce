import { ReactNode } from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'

function AdminRoute( {children}: {children: ReactNode} ) {
    const {role, token, loading} = useAuth()
  if (loading) return
    <div className='flex items-center justify-center h-screen'>
      <LoaderCircle className='animate-spin size-14' />
    </div>;
  return token && role === "admin" ? <>{children}</> : <Navigate to="/signin"/>
}

export default AdminRoute