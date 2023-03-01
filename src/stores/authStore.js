import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import isEmpty from 'lodash/isEmpty'
import { signJWT, verifyJWT } from '@lib/jwt'
import { validateToken } from '@lib/auth'

const initialState = () => ({
  headers: {},
  loggedUser: {},
  isAuthenticated: false,
})

const useAuthStore = create(subscribeWithSelector(initialState))

export default useAuthStore

export const useAuthStoreWithCookies = () => {
  const [cookies, setCookie] = useCookies(['auth-storage'])
  const [authFromCookiesLoaded, setAuthFromCookiesLoaded] = useState(false)

  // subscribe for any changes in authStore
  // save its encrypted value to cookies everytime its value changes
  useEffect(
    () =>
      useAuthStore.subscribe(
        (state) => {
          const { headers, loggedUser, isAuthenticated } = state
          return { headers, loggedUser, isAuthenticated }
        },
        (auth) => {
          const setAuth = async () => {
            setCookie('auth-storage', await signJWT(auth))
          }
          setAuth()
        },
        { fireImmediately: true }
      ),
    []
  )

  // get auth data from cookies and validate the token.
  // set logged status if token is valid
  useEffect(() => {
    const parseAndDecryptAuth = async () => {
      // there is no saved auth cookie so there is no token to validate
      if (isEmpty(cookies['auth-storage'])) {
        setAuthFromCookiesLoaded(true)
        return
      }

      // decrypt cookie and get the header
      const {
        payload: { headers },
      } = (await verifyJWT(cookies['auth-storage'])) || {}

      // validate the headers
      const { data: loggedUser, success } = await validateToken(headers)

      // token is valid
      if (success) {
        useAuthStore.setState({ headers, loggedUser, isAuthenticated: true })
      }

      setAuthFromCookiesLoaded(true)
    }

    parseAndDecryptAuth()
  }, [])

  return authFromCookiesLoaded
}
