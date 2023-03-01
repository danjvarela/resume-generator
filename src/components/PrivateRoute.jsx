import { Outlet, Navigate } from 'react-router-dom'
import useAuthStore from '@stores/authStore'

// Returns a route if user is logged in, otherwise redirects to the login page
export default function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
