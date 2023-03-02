import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '@components/PrivateRoute'
import PublicRoute from '@components/PublicRoute'
import Landing from '@pages/Landing'
import Login from '@pages/Login'
import Resumes from '@pages/Resumes'
import Signup from '@pages/Signup'
import Drafts from '@pages/Drafts'
import Profile from '@pages/Profile'
import NewResume from '@pages/NewResume'
import MainLayout from '@layouts/MainLayout'
import LoadingScreen from '@components/LoadingScreen'
import { useEffect } from 'react'
import useAuthStore from '@stores/authStore'
import { validateToken } from '@lib/auth'
import { shallow } from 'zustand/shallow'
import useAlertStore from '@stores/alertStore'

export default function App() {
  const [
    headers,
    loggedUser,
    headersValidated,
    setLoggedUser,
    setHeadersValidated,
    clearAuth,
  ] = useAuthStore(
    (state) => [
      state.headers,
      state.loggedUser,
      state._headersValidated,
      state.setLoggedUser,
      state.setHeadersValidated,
      state.clearAuth,
    ],
    shallow
  )

  const setWarning = useAlertStore((state) => state.setWarning)

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
              setLoggedUser(data.data)
              setHeadersValidated(true)
            } else {
              setHeadersValidated(true)
              clearAuth()
              setWarning(
                'Session has expired. Please log in again to continue.'
              )
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
        <Route path="/resumes/new" element={<NewResume />} />
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
