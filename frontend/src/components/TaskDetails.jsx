import {
  Box,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCalendarAlt, FaClock, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'

const TaskDetails = ({ task, onClose, onEdit }) => {
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'in progress':
        return 'blue'
      default:
        return 'yellow'
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete task')

      toast({
        title: 'Task deleted successfully',
        status: 'success',
        duration: 3000,
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Error deleting task',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <Box p={6} bg={bgColor} rounded="xl" shadow="lg" border="1px" borderColor={borderColor}>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            {task.title}
          </Text>
          <Badge 
            colorScheme={getStatusColor(task.status)} 
            fontSize="md" 
            px={3} 
            py={1}
            rounded="full"
          >
            {task.status}
          </Badge>
        </HStack>

        <Divider />

        <Box>
          <Text fontWeight="semibold" mb={2} color="gray.700">Description</Text>
          <Text color="gray.600" whiteSpace="pre-wrap" fontSize="md">
            {task.description}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold" mb={2} color="gray.700">Due Date</Text>
          <HStack spacing={4} color="gray.600">
            <HStack>
              <Icon as={FaCalendarAlt} />
              <Text>
                {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaClock} />
              <Text>
                {new Date(task.dueDate).toLocaleTimeString()}
              </Text>
            </HStack>
          </HStack>
        </Box>

        <Box>
          <Text fontWeight="semibold" mb={2} color="gray.700">Created At</Text>
          <HStack spacing={4} color="gray.600">
            <HStack>
              <Icon as={FaCalendarAlt} />
              <Text>
                {new Date(task.createdAt).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaClock} />
              <Text>
                {new Date(task.createdAt).toLocaleTimeString()}
              </Text>
            </HStack>
          </HStack>
        </Box>

        <Divider />

        <HStack spacing={4} justify="flex-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            leftIcon={<Icon as={FaTimes} />}
            _hover={{ transform: 'translateY(-1px)' }}
          >
            Close
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={() => onEdit?.(task)}
            leftIcon={<Icon as={FaEdit} />}
            _hover={{ transform: 'translateY(-1px)' }}
          >
            Edit Task
          </Button>
          <Button 
            colorScheme="red" 
            onClick={handleDelete}
            leftIcon={<Icon as={FaTrash} />}
            _hover={{ transform: 'translateY(-1px)' }}
          >
            Delete Task
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default TaskDetails 