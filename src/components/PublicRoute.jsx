import { Outlet, Navigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// Returns a route if user is logged in, otherwise redirects to the login page
export default function PublicRoute({ loggedUser }) {
  return !isEmpty(loggedUser) ? <Navigate to="/resumes" /> : <Outlet />
}
