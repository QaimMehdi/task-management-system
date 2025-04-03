import React from 'react';
import {
  Box,
  Text,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const TaskProgress = ({ tasks }) => {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  // Calculate percentages
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPercentage = totalTasks ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const pendingPercentage = totalTasks ? Math.round((pendingTasks / totalTasks) * 100) : 0;

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      mb={6}
    >
      <VStack spacing={6} align="stretch">
        {/* Overall Progress Section */}
        <Box textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Overall Progress
          </Text>
          <HStack justify="center" spacing={8}>
            <CircularProgress
              value={completionPercentage}
              size="120px"
              thickness="8px"
              color="green.400"
            >
              <CircularProgressLabel>{completionPercentage}%</CircularProgressLabel>
            </CircularProgress>
            <Box>
              <Text color="gray.500">
                {completedTasks} of {totalTasks} tasks completed
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* Detailed Statistics */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Stat
            px={4}
            py={2}
            shadow="sm"
            border="1px solid"
            borderColor={borderColor}
            rounded="lg"
            bg={useColorModeValue('green.50', 'green.900')}
          >
            <StatLabel color={useColorModeValue('green.600', 'green.200')}>Completed</StatLabel>
            <StatNumber>{completedTasks}</StatNumber>
            <StatHelpText>{completionPercentage}%</StatHelpText>
            <Progress value={completionPercentage} size="sm" colorScheme="green" mt={2} />
          </Stat>

          <Stat
            px={4}
            py={2}
            shadow="sm"
            border="1px solid"
            borderColor={borderColor}
            rounded="lg"
            bg={useColorModeValue('blue.50', 'blue.900')}
          >
            <StatLabel color={useColorModeValue('blue.600', 'blue.200')}>In Progress</StatLabel>
            <StatNumber>{inProgressTasks}</StatNumber>
            <StatHelpText>{inProgressPercentage}%</StatHelpText>
            <Progress value={inProgressPercentage} size="sm" colorScheme="blue" mt={2} />
          </Stat>

          <Stat
            px={4}
            py={2}
            shadow="sm"
            border="1px solid"
            borderColor={borderColor}
            rounded="lg"
            bg={useColorModeValue('orange.50', 'orange.900')}
          >
            <StatLabel color={useColorModeValue('orange.600', 'orange.200')}>Pending</StatLabel>
            <StatNumber>{pendingTasks}</StatNumber>
            <StatHelpText>{pendingPercentage}%</StatHelpText>
            <Progress value={pendingPercentage} size="sm" colorScheme="orange" mt={2} />
          </Stat>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default TaskProgress; 