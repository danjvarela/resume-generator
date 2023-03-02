import { Heading } from '@chakra-ui/react'
import Resume from './Resume'
import { useEffect } from 'react'
import { getAllResumes } from '@lib/resumes'
import useResumeStore from '@stores/resumeStore'
import useAuthStore from '@stores/authStore'
import useAlertStore from '@stores/alertStore'

export default function Home() {
  const [headers, clearAuth] = useAuthStore((state) => [
    state.headers,
    state.clearAuth,
  ])
  const setWarning = useAlertStore((state) => state.setWarning)
  const [resumes, setResumes] = useResumeStore((state) => [
    state.resumes,
    state.setResumes,
  ])

  // get all resumes on mount
  useEffect(() => {
    ;(async () => {
      const { data, status } = await getAllResumes(headers)
      if (status === 401) {
        clearAuth()
        setWarning('Session has expired. Please log in again to continue.')
      } else {
        setResumes(data)
      }
    })()
  }, [])

  useEffect(() => {
    console.log('resumes', resumes)
  }, [resumes])

  return (
    <>
      <Heading as="h1" size="lg" noOfLines={1}>
        My Resumes
      </Heading>
      {resumes.map((resume) => (
        <Resume key={resume.id} resume={resume} />
      ))}
    </>
  )
}
