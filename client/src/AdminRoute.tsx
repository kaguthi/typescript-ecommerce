import { ReactNode } from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

function AdminRoute( {children}: {children: ReactNode} ) {
    const {role, token} = useAuth()
  return token && role === "admin" ? <>{children}</> : <Navigate to="/signin"/>
}

export default AdminRoute