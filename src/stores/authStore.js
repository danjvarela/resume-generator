import { create } from 'zustand'
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const cookieStorage = {
  getItem: (name) => cookies.get(name),
  setItem: (name, value) => cookies.set(name, value),
  removeItem: (name) => cookies.remove(name),
}

const useAuthStore = create(
  subscribeWithSelector(
    persist(
      () => ({
        headers: cookies.get('auth-storage')?.state?.headers || {},
        loggedUser: {},
        isAuthenticated: !!cookies.get('auth-storage')?.state?.isAuthenticated,
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => cookieStorage),
        // only save these values in cookies
        partialize: (state) => ({
          headers: state.headers,
          loggedUser: state.loggedUser,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
)

export default useAuthStore
