import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '@components/PrivateRoute'
import PublicRoute from '@components/PublicRoute'
import Landing from '@pages/Landing'
import Login from '@pages/Login'
import Resumes from '@pages/Resumes'
import Signup from '@pages/Signup'
import Drafts from '@pages/Drafts'
import Profile from '@pages/Profile'
import MainLayout from '@layouts/MainLayout'
import LoadingScreen from '@components/LoadingScreen'
import { useEffect } from 'react'
import useAuthStore from '@stores/authStore'
import { validateToken } from '@lib/auth'

export default function App() {
  const headers = useAuthStore((state) => state.headers)
  const loggedUser = useAuthStore((state) => state.loggedUser)
  const headersValidated = useAuthStore((state) => state._headersValidated)

  // validate headers once auth's value has been updated from cookies
  useEffect(() => {
    const unsubHasHydrated = useAuthStore.subscribe(
      (state) => state._hasHydrated,
      (hasHydrated) => {
        const validate = async () => {
          if (hasHydrated) {
            const headers = useAuthStore.getState().headers
            const { data, success } = await validateToken(headers)
            if (success) {
              useAuthStore.setState({
                loggedUser: data.data,
                _headersValidated: true,
              })
            } else {
              useAuthStore.setState({ _headersValidated: true })
            }
          }
        }
        validate()
      }
    )
    return unsubHasHydrated
  }, [])

  if (!headersValidated) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* These routes require authentication */}
      <Route
        element={
          <MainLayout>
            <PrivateRoute loggedUser={loggedUser} headers={headers} />
          </MainLayout>
        }
      >
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* These routes does not require authentication to be accessed but will reroute to /resumes if  */}
      {/* there is authentication data in cookies */}
      <Route
        element={<PublicRoute loggedUser={loggedUser} headers={headers} />}
      >
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}
