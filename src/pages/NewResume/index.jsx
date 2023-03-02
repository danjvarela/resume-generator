import {
  HStack,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import PersonalDetails from './PersonalDetails'
import WorkExperience from './WorkExperiences'
import Education from './Education'
import Skills from './Skills'
import ResumeTitle from './ResumeTitle'

export default function NewResume() {
  const [title] = useState('New Resume')

  return (
    <>
      <ResumeTitle title={title} />
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
        <Button colorScheme="blue">Save</Button>
        <Button colorScheme="blue" variant="outline">
          Cancel
        </Button>
      </HStack>
    </>
  )
}
