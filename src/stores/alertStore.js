import { create } from 'zustand'

const useAlertStore = create((set) => ({
  message: null,
  status: 'info', // can be `error`, `success`, `warning`
  setInfo: (message) => set({ message, status: 'info' }),
  setError: (message) => set({ message, status: 'error' }),
  setWarning: (message) => set({ message, status: 'warning' }),
  setSuccess: (message) => set({ message, status: 'success' }),
  removeAlert: () => set({ message: null }),
}))

export default useAlertStore
