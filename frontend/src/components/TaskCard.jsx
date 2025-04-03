import React, { useState } from 'react';
import {
  Box,
  Text,
  Badge,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditTaskModal from './EditTaskModal';
import { taskService } from '../services/taskService';

const TaskCard = ({ task, onDelete, onStatusChange, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      default:
        return 'orange';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTask(task._id, {
        ...task,
        status: newStatus,
      });
      // Refresh the task list
      window.location.reload();
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  return (
    <>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg={bgColor}
        borderColor={borderColor}
        position="relative"
        transition="all 0.2s"
        _hover={{ shadow: 'lg' }}
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" align="start">
            <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
              {task.title}
            </Text>
            <HStack spacing={2}>
              <Tooltip label="Edit task" placement="top">
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => setIsEditModalOpen(true)}
                />
              </Tooltip>
              <Tooltip label="Delete task" placement="top">
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => onDelete(task._id)}
                />
              </Tooltip>
            </HStack>
          </HStack>

          <Text noOfLines={3} color={useColorModeValue('gray.600', 'gray.300')}>
            {task.description}
          </Text>

          <HStack justify="space-between" align="center">
            <Badge
              colorScheme={getStatusColor(task.status)}
              cursor="pointer"
              onClick={() => onStatusChange(task._id, task.status)}
              px={2}
              py={1}
              borderRadius="full"
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              Due: {formatDate(task.dueDate)}
            </Text>
          </HStack>
        </VStack>
      </Box>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onTaskUpdate={(updatedTask) => {
          onUpdate(updatedTask);
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard; 