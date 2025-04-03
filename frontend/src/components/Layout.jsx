import React from 'react';
import { Box, Container, VStack, useBreakpointValue } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  const containerWidth = useBreakpointValue({
    base: '95%',    // Almost full width on mobile
    sm: '95%',      // Almost full width on small screens
    md: '90%',      // 90% width on medium screens
    lg: '90%',      // 90% width on large screens
    xl: '1400px',   // Fixed max width on extra large screens
    '2xl': '1600px' // Even larger screens
  });

  const padding = useBreakpointValue({
    base: 3,        // Smaller padding on mobile
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10         // Larger padding for bigger screens
  });

  const spacing = useBreakpointValue({
    base: 4,        // Tighter spacing on mobile
    sm: 5,
    md: 6,
    lg: 8,
    xl: 10         // Larger spacing for bigger screens
  });

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Header />
      <Container 
        maxW={containerWidth} 
        py={padding}
        mx="auto"
        w="full"
        px={{ base: 2, sm: 4, md: 6, lg: 8 }}
      >
        <VStack spacing={spacing} align="stretch" w="full">
          {children}
        </VStack>
      </Container>
    </Box>
  );
};

export default Layout; 