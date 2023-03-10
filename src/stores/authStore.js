import { create } from 'zustand'
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from 'zustand/middleware'
import { signJWT, verifyJWT } from '@lib/jwt'
import Cookies from 'universal-cookie'
import isEmpty from 'lodash-es/isEmpty'
import merge from 'lodash-es/merge'

const cookies = new Cookies()

const cookieStorage = {
  getItem: async (name) => {
    const jwt = cookies.get(name)
    if (isEmpty(jwt)) {
      return '{}'
    }
    const { payload } = await verifyJWT(jwt)
    console.log(`${name} has been retrieved. decrypted value is: `, payload)
    return JSON.stringify(payload)
  },
  setItem: async (name, value) => {
    const jwt = await signJWT(JSON.parse(value))
    cookies.set(name, jwt)
    console.log(
      `${name} has been set to encrypted value of: `,
      JSON.parse(value)
    )
  },
  removeItem: async (name) => {
    cookies.remove(name)
  },
}

const persistMiddlewareOpts = {
  name: '_resume-generator-auth',
  partialize: (state) => {
    const { headers, loggedUser } = state
    return { headers, loggedUser }
  },
  storage: createJSONStorage(() => cookieStorage),
  merge: (persistedState, currentState) => merge(currentState, persistedState),
  onRehydrateStorage: () => {
    console.log('hydration started')

    return (state, error) => {
      if (error) {
        console.log('an error occurred during hydration', error)
      } else {
        state.setHasHydrated(true)
        console.log('hydration finished', state)
      }
    }
  },
}

const initialState = (set) => ({
  headers: {},
  loggedUser: {},
  _headersValidated: false,
  _hasHydrated: false,
  clearAuth: () => set({ headers: {}, loggedUser: {} }),
  setHasHydrated: (state) => {
    set({
      _hasHydrated: state,
    })
  },
  setHeaders: (headers) => set({ headers }),
  setLoggedUser: (loggedUser) => set({ loggedUser }),
  setHeadersValidated: (state) => set({ _headersValidated: state }),
})

const useAuthStore = create(
  subscribeWithSelector(persist(initialState, persistMiddlewareOpts))
)

export default useAuthStore
