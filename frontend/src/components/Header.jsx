import React, { useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useColorMode,
  Image,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import logo from '../assets/logo.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    // Update authentication state
    setIsAuthenticated(false);
    // Show success message
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      px={4}
      py={2}
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Image src={logo} alt="Tasky" h="40px" />
          </Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            display={{ base: 'none', md: 'block' }}
          >
            Tasky
          </Text>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
          <Button
            colorScheme="red"
            variant="ghost"
            onClick={handleLogout}
            size={{ base: 'sm', md: 'md' }}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header; 