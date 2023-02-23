import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function LoginRenderer(props) {
  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    isSubmitting,
    alertMessage,
    alertStatus,
    onSubmit,
  } = props

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={'md'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Start creating your resume
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack
            spacing={4}
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {alertMessage ? (
              <Alert status={alertStatus}>
                <AlertIcon />
                {alertMessage}
              </Alert>
            ) : null}
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email')} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type={'submit'}
                loadingText="Submitting"
                isLoading={isSubmitting}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack>
              <Text align={'center'}>
                Don&#39;t have an account?{' '}
                <Link color={'blue.400'} href={'/signup'}>
                  Create one!
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
