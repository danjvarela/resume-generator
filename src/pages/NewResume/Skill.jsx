import { Text, HStack } from '@chakra-ui/react'

export default function Skill() {
  return (
    <HStack>
      <Text as="b" fontSize="sm">
        ReactJS
      </Text>
      <Text fontSize="sm" color="gray.600">
        10 years
      </Text>
    </HStack>
  )
}
