import { Heading, Box, IconButton, VStack } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import Job from './Job'

export default function WorkExperience() {
  return (
    <Box>
      <Heading
        size="sm"
        textTransform="uppercase"
        display="flex"
        justifyContent="space-between"
      >
        Work Experience
        <IconButton
          isRound
          variant="ghost"
          aria-label="Edit Resume"
          size="md"
          icon={<FiEdit />}
          colorScheme="blue"
        />
      </Heading>
      <VStack spacing={5} alignItems='start'>
        <Job />
        <Job />
      </VStack>
    </Box>
  )
}
