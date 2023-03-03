import { VStack, Heading, Text } from '@chakra-ui/react'

export default function Job() {
  return (
    <VStack alignItems="start" spacing={0}>
      <Heading size="xs" textTransform="uppercase">
        Job Description 1
      </Heading>
      <Text fontSize="sm">Company Name</Text>
      <Text fontSize="sm" color="gray.600">
        Date start - Date end
      </Text>
    </VStack>
  )
}
