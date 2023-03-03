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
import useWebSocket from 'react-use-websocket'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash-es/isEmpty'
import useWebsocketStore from '@stores/websocketStore'

export default function App() {
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    import.meta.env.VITE_APP_WEBSOCKETS_URL,
    {
      filter: ({ data }) => {
        const jsonParsedData = JSON.parse(data)
        return !isEmpty(jsonParsedData?.identifier)
      },
    }
  )
  const [setLastJsonMessage, setAction] = useWebsocketStore((state) => [
    state.setLastJsonMessage,
    state.setAction,
  ])

  const [
    headers,
    loggedUser,
    headersValidated,
    setLoggedUser,
    setHeadersValidated,
    clearAuth,
    hasHydrated,
  ] = useAuthStore(
    (state) => [
      state.headers,
      state.loggedUser,
      state._headersValidated,
      state.setLoggedUser,
      state.setHeadersValidated,
      state.clearAuth,
      state._hasHydrated,
    ],
    shallow
  )

  const setWarning = useAlertStore((state) => state.setWarning)

  useEffect(() => {
    if (
      !isEmpty(lastJsonMessage?.identifier) &&
      !isEmpty(lastJsonMessage?.message)
    ) {
      const { action, ...message } = lastJsonMessage.message
      setLastJsonMessage(message)
      setAction(action)
    }
  }, [lastJsonMessage])

  useEffect(() => {
    if (readyState === 1) {
      // once the websockets has started, subscribe to the ResumesChannel from API
      sendJsonMessage({
        command: 'subscribe',
        identifier: JSON.stringify({
          id: uuidv4(),
          channel: 'ResumesChannel',
        }),
      })
    }
  }, [readyState])

  // validate headers once auth's value has been updated from cookies
  useEffect(() => {
    const validate = async () => {
      if (hasHydrated) {
        const headers = useAuthStore.getState().headers
        const { data, success } = await validateToken(headers)
        if (success) {
          setLoggedUser(data)
          setHeadersValidated(true)
        } else {
          setWarning('Session expired. Please log in again to continue.')
          setHeadersValidated(true)
          clearAuth()
        }
      }
    }
    validate()
  }, [hasHydrated])

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
