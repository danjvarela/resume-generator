import { create } from 'zustand'

const useWebsocketStore = create((set) => ({
  lastJsonMessage: null,
  action: null,
  setLastJsonMessage: (lastJsonMessage) => set({ lastJsonMessage }),
  setAction: (action) => set({ action }),
}))

export default useWebsocketStore
