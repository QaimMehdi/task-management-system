import React from 'react';
import {
  Box,
  Text,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
  Badge,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { taskService } from '../services/taskService';

const MotionBox = motion(Box);

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

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const padding = useBreakpointValue({
    base: 3,
    sm: 4,
    md: 5,
  });

  const titleSize = useBreakpointValue({
    base: 'md',
    sm: 'lg',
    md: 'lg',
  });

  const descriptionSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'md',
  });

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
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      w="full"
    >
      <Box
        bg={bgColor}
        p={padding}
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
        _hover={{ bg: hoverBg }}
        height="100%"
        w="full"
      >
        <VStack align="stretch" spacing={3} h="100%">
          <HStack 
            justify="space-between" 
            align="start"
            spacing={{ base: 2, sm: 3 }}
          >
            <Text
              fontSize={titleSize}
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'white')}
              noOfLines={2}
              flex="1"
            >
              {task.title}
            </Text>
            <HStack spacing={{ base: 1, sm: 2 }}>
              <Tooltip label="Edit Task" placement="top">
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => onEdit(task)}
                  aria-label="Edit task"
                  variant="ghost"
                  colorScheme="blue"
                  size={{ base: 'sm', md: 'sm' }}
                />
              </Tooltip>
              <Tooltip label="Delete Task" placement="top">
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => onDelete(task._id)}
                  aria-label="Delete task"
                  variant="ghost"
                  colorScheme="red"
                  size={{ base: 'sm', md: 'sm' }}
                />
              </Tooltip>
            </HStack>
          </HStack>

          <Text
            fontSize={descriptionSize}
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={3}
            flex="1"
          >
            {task.description}
          </Text>

          <HStack 
            justify="space-between" 
            align="center" 
            mt="auto"
            spacing={{ base: 2, sm: 3 }}
          >
            <Badge
              colorScheme={getStatusColor(task.status)}
              px={2}
              py={1}
              borderRadius="full"
              cursor="pointer"
              onClick={() => onStatusChange(task._id, task.status)}
              fontSize={{ base: 'xs', sm: 'sm' }}
              textTransform="capitalize"
            >
              {task.status}
            </Badge>
            <Text
              fontSize={{ base: 'xs', sm: 'sm' }}
              color={useColorModeValue('gray.500', 'gray.400')}
            >
              {new Date(task.createdAt).toLocaleDateString()}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default TaskCard; 