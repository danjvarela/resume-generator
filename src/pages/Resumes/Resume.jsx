import {
  Heading,
  Card,
  CardBody,
  HStack,
  VStack,
  IconButton,
  LinkOverlay,
  LinkBox,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import { FiTrash, FiEdit, FiDownload } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
// import TextWithRef from '@components/TextWithRef'
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Resume({ resume: { title, created_at: createdAt } }) {
  const timeAgoInWords = formatDistanceToNow(new Date(Date(createdAt)))
  const formattedCreatedAt = format(
    new Date(Date(createdAt)),
    'MMMM d, yyyy h:mm b'
  )

  return (
    <Card as={LinkBox} mt={5}>
      <CardBody>
        <HStack justifyContent="space-between">
          <VStack spacing={0} alignItems="start">
            <LinkOverlay as={RouterLink} to="/sample-resume">
              <Heading as="h2" size="sm" noOfLines={1}>
                {title}
              </Heading>
            </LinkOverlay>
            {/* just got the zIndex value here https://github.com/chakra-ui/chakra-ui/issues/1604 */}
            <Tooltip
              hasArrow
              label={formattedCreatedAt}
              placement="bottom-start"
            >
              <Text fontSize="sm" cursor={'pointer'} zIndex={1400}>
                Created {timeAgoInWords} ago
              </Text>
            </Tooltip>
          </VStack>
          <HStack>
            <IconButton
              isRound
              variant="ghost"
              aria-label="Download Resume"
              size="md"
              icon={<FiDownload />}
            />
            <IconButton
              isRound
              variant="ghost"
              aria-label="Edit Resume"
              size="md"
              icon={<FiEdit />}
            />
            <IconButton
              isRound
              variant="ghost"
              colorScheme="red"
              aria-label="Delete Resume"
              size="md"
              icon={<FiTrash />}
            />
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  )
}
