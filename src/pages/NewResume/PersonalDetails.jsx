import { Heading, Text, Box, IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'

export default function PersonalDetails() {
  return (
    <Box>
      <Heading
        size="md"
        textTransform="uppercase"
        display="flex"
        justifyContent="space-between"
      >
        Danmar Varela
        <IconButton
          isRound
          variant="ghost"
          aria-label="Edit Resume"
          size="md"
          icon={<FiEdit />}
          colorScheme="blue"
        />
      </Heading>
      <Text as="b" fontSize="sm">
        Brief description about me
      </Text>
      <Text fontSize="sm">Quezon City</Text>
      <Text fontSize="sm">+63 923 456 7890</Text>
    </Box>
  )
}
