import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '@stores/authStore'

const useAutoRedirect = () => {
  const { headers, isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const currentLocation = useLocation()

  const autoRedirect = () => {
    const requireLogIn = (path) => {
      return ['/home'].includes(path)
    }

    if (isLoggedIn() && !requireLogIn(currentLocation.pathname)) {
      navigate('/home')
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
