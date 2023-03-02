import { create } from 'zustand'

const useResumeStore = create((set) => ({
  resumes: [],
  setResumes: (resumes) => set({ resumes }),
}))

export default useResumeStore
