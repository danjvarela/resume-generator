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
  Link,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function SignupRenderer(props) {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = props

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={8}
        mx={'auto'}
        py={12}
        px={6}
        w={'full'}
        maxW={'md'}
        minW={'sm'}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Signup
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Let&#39;s get you started!
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
            <FormControl isRequired isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email')} />
              {errors.email && (
                <FormErrorMessage>
                  Email {errors.email.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={errors.password}>
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
              {errors.password && (
                <FormErrorMessage>
                  Password {errors.password.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={errors.password_confirmation}>
              <FormLabel>Confirm password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('password_confirmation')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmPassword(
                        (showConfirmPassword) => !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password_confirmation && (
                <FormErrorMessage>
                  Password Confirmation {errors.password_confirmation.message}
                </FormErrorMessage>
              )}
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
                Signup
              </Button>
            </Stack>
            <Stack>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} href={'/login'}>
                  Log in!
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
