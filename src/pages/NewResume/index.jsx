import {
  HStack,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createResume } from '@lib/resumes'
import useAuthStore from '@stores/authStore'
import useAlertStore from '@stores/alertStore'
import { shallow } from 'zustand/shallow'
import PersonalDetails from './PersonalDetails'
import WorkExperience from './WorkExperiences'
import Education from './Education'
import Skills from './Skills'
import ResumeTitle from './ResumeTitle'

export default function NewResume() {
  const [title, setTitle] = useState('New Resume')
  const navigate = useNavigate()
  const setWarning = useAlertStore((state) => state.setWarning)
  const [headers, clearAuth] = useAuthStore(
    (state) => [state.headers, state.clearAuth],
    shallow
  )

  const handleCreateResume = async () => {
    const { status } = await createResume({ title }, headers)
    if (status === 401) {
      clearAuth()
      setWarning('Session has expired. Please log in again to continue.')
    } else {
      navigate('/resumes')
    }
  }

  return (
    <>
      <ResumeTitle title={title} setTitle={setTitle} />
      <Card mt={5}>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <PersonalDetails />
            <WorkExperience />
            <Education />
            <Skills />
          </Stack>
        </CardBody>
      </Card>
      <HStack mt={5}>
        <Button colorScheme="blue" onClick={handleCreateResume}>
          Save
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => navigate('/resumes')}
        >
          Cancel
        </Button>
      </HStack>
    </>
  )
}
