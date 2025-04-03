import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Header = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Heading
        as="h1"
        size="xl"
        bgGradient="linear(to-r, blue.500, purple.500)"
        bgClip="text"
        mb={2}
      >
        Task Management System
      </Heading>
      <Text color="gray.600" fontSize="lg">
        Organize your tasks efficiently and boost productivity
      </Text>
    </Box>
  );
};

export default Header; 