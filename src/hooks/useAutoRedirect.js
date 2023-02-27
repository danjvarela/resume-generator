import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '@stores/authStore'

const useAutoRedirect = () => {
  const { headers, isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const currentLocation = useLocation()

  const autoRedirect = () => {
    const authRequiredPaths = ['/resumes', '/drafts', '/profile']
    const requireLogIn = (path) => authRequiredPaths.includes(path)

    if (isLoggedIn() && !requireLogIn(currentLocation.pathname)) {
      navigate('/resumes')
    }

    if (!isLoggedIn() && requireLogIn(currentLocation.pathname)) {
      navigate('/login')
    }
  }

  useEffect(() => {
    // this needs to run only once on mount
    autoRedirect()
  }, [])

  useEffect(() => {
    autoRedirect()
  }, [headers])
}

export default useAutoRedirect
