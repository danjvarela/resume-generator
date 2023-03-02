import { Heading, Box, IconButton, VStack, Text } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'

export default function Education() {
  return (
    <Box>
      <Heading
        size="sm"
        textTransform="uppercase"
        display="flex"
        justifyContent="space-between"
      >
        Education
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
        <Heading size="xs" textTransform="uppercase">
          Bachelor of Science in Computer Engineering
        </Heading>
        <Text fontSize="sm">School Name</Text>
        <Text fontSize="sm" color="gray.600">
          Date start - Date end
        </Text>
      </VStack>
    </Box>
  )
}
