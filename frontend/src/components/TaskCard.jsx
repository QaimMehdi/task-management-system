import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import { FaTrash, FaPlay, FaCheck } from 'react-icons/fa';
import { taskService } from '../services/taskService';

const TaskCard = ({ task, onDelete }) => {
  const toast = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'in-progress':
        return 'blue';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTask(task._id, {
        ...task,
        status: newStatus,
      });
      toast({
        title: 'Success',
        description: 'Task status updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Refresh the task list
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      height="100%"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
      display="flex"
      flexDirection="column"
    >
      <VStack align="stretch" spacing={4} flex="1">
        <HStack>
          <Heading size="md" noOfLines={2}>{task.title}</Heading>
          <Spacer />
          <Badge colorScheme={getStatusColor(task.status)} px={2} py={1} borderRadius="md">
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
        </HStack>

        <Text color="gray.600" noOfLines={3}>{task.description}</Text>

        <Text fontSize="sm" color="gray.500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Text>

        <Spacer />

        <HStack spacing={2} mt="auto">
          {task.status !== 'in-progress' && task.status !== 'completed' && (
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<FaPlay />}
              onClick={() => handleStatusChange('in-progress')}
              flex="1"
            >
              Start
            </Button>
          )}
          {task.status !== 'completed' && (
            <Button
              size="sm"
              colorScheme="green"
              leftIcon={<FaCheck />}
              onClick={() => handleStatusChange('completed')}
              flex="1"
            >
              Complete
            </Button>
          )}
          <Button
            size="sm"
            colorScheme="red"
            leftIcon={<FaTrash />}
            onClick={() => onDelete(task._id)}
            flex="1"
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TaskCard; 