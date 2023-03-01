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
import { useAuthStoreWithCookies } from '@stores/authStore'

export default function App() {
  const authFromCookiesLoaded = useAuthStoreWithCookies()

  if (!authFromCookiesLoaded) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* These routes require authentication */}
      <Route
        element={
          <MainLayout>
            <PrivateRoute />
          </MainLayout>
        }
      >
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* These routes does not require authentication to be accessed but will reroute to /resumes if  */}
      {/* there is authentication data in cookies */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}
