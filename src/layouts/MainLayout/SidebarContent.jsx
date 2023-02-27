import { FiHome, FiClipboard, FiUser } from 'react-icons/fi'
import { Box, CloseButton, Flex, Text } from '@chakra-ui/react'
import NavItem from './NavItem'
import { useNavigate } from 'react-router-dom'

const LinkItems = [
  { name: 'My Resumes', icon: FiHome, path: '/resumes' },
  { name: 'Drafts', icon: FiClipboard, path: '/drafts' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
]

export default function SidebarContent({ onClose, ...rest }) {
  const navigate = useNavigate()

  return (
    <Box
      transition="3s ease"
      bg={'white'}
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">
          Resume Generator
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => navigate(link.path)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
