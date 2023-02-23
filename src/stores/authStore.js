import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const cookieStorage = {
  getItem: (name) => cookies.get(name),
  setItem: (name, value) => cookies.set(name, value),
  removeItem: (name) => cookies.remove(name),
}

const useAuthStore = create(
  persist(
    (_, get) => ({
      headers: cookies.get('auth-storage')?.state?.headers,
      isLoggedIn: () => !!get().headers?.['access-token'],
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
)

export default useAuthStore
