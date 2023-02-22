import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useAutoRedirect from '@hooks/useAutoRedirect'

export default function Landing() {
  useAutoRedirect()

  const navigate = useNavigate()
  const navigateToLogin = () => navigate('/login')

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Create Resumes
            <br />
            <Text as={'span'} color={'green.400'}>
              with ease
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Create and modify resumes with ease using our predefined templates.
            Download them as a pdf and start with your job application.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Get Started
            </Button>
            <Button
              variant={'link'}
              colorScheme={'blue'}
              onClick={navigateToLogin}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
