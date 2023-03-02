import { Outlet, Navigate } from 'react-router-dom'
import isEmpty from 'lodash-es/isEmpty'

// Returns a route if user is logged in, otherwise redirects to the login page
export default function PrivateRoute({ loggedUser, headers }) {
  return isEmpty(loggedUser) || isEmpty(headers) ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  )
}
