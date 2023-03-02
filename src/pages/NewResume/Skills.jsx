import { Heading, Box, IconButton, VStack } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import Skill from './Skill'

export default function Skills() {
  return (
    <Box>
      <Heading
        size="sm"
        textTransform="uppercase"
        display="flex"
        justifyContent="space-between"
      >
        Skills
        <IconButton
          isRound
          variant="ghost"
          aria-label="Edit Resume"
          size="md"
          icon={<FiEdit />}
          colorScheme="blue"
        />
      </Heading>

      <VStack alignItems="start" spacing={0}>
        <Skill />
        <Skill />
      </VStack>
    </Box>
  )
}
