import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Container,
  Heading,
  Divider,
  Link,
  Image,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App';
import taskLogo from '../../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      // Use the login function from context
      login(data.token, data);

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Navigate to the intended page or default to tasks
      const from = location.state?.from?.pathname || '/tasks';
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box
        bg={bgColor}
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px"
        borderColor={borderColor}
        display="flex"
        gap={8}
      >
        {/* Left side - Login Form */}
        <Box flex="1">
          <VStack spacing={6} align="stretch">
            <HStack spacing={3}>
              <Image src={taskLogo} alt="Tasky Logo" boxSize="40px" />
              <Heading size="lg">Tasky</Heading>
            </HStack>
            
            <Box>
              <Heading size="2xl" mb={2}>Welcome Back!</Heading>
              <Text color="gray.600">Please enter login details below</Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email"
                    size="lg"
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter the Password"
                    size="lg"
                    required
                  />
                </FormControl>

                <Link
                  alignSelf="flex-end"
                  color="blue.500"
                  fontSize="sm"
                  href="#"
                >
                  Forgot password?
                </Link>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </VStack>
            </form>

            <VStack spacing={4}>
              <HStack w="full">
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                  Or continue
                </Text>
                <Divider />
              </HStack>

              <Button
                w="full"
                size="lg"
                variant="outline"
                leftIcon={<FcGoogle />}
              >
                Log in with Google
              </Button>

              <Text textAlign="center">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/register" color="blue.500">
                  Sign Up
                </Link>
              </Text>
            </VStack>
          </VStack>
        </Box>

        {/* Right side - Illustration */}
        <Box
          flex="1"
          bg="blue.100"
          borderRadius="xl"
          p={8}
          display={{ base: 'none', lg: 'block' }}
        >
          <VStack h="full" justify="center" spacing={8}>
            <Box>
              {/* Add your illustration here */}
              <Text
                fontSize="xl"
                fontStyle="italic"
                color="blue.800"
                textAlign="center"
              >
                Manage your task in a easy and more efficient way with Tasky...
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 