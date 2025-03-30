import {
  Box,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa'
import TaskDetails from './TaskDetails'

const TaskCard = ({ task, onDelete, onEdit }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

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

      onDelete?.(task._id)
      toast({
        title: 'Task deleted successfully',
        status: 'success',
        duration: 3000,
      })
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
    <>
      <Box
        p={6}
        bg={bgColor}
        rounded="xl"
        shadow="md"
        cursor="pointer"
        onClick={onOpen}
        border="1px"
        borderColor={borderColor}
        _hover={{ 
          shadow: 'xl', 
          transform: 'translateY(-4px)', 
          transition: 'all 0.2s',
          borderColor: 'blue.500'
        }}
      >
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold" noOfLines={1} color="blue.600">
              {task.title}
            </Text>
            <Badge 
              colorScheme={getStatusColor(task.status)}
              px={3}
              py={1}
              fontSize="sm"
              rounded="full"
            >
              {task.status}
            </Badge>
          </HStack>

          <Text color="gray.600" noOfLines={2} fontSize="md">
            {task.description}
          </Text>

          <HStack spacing={4} color="gray.500" fontSize="sm">
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

          <HStack spacing={2} justify="flex-end">
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<Icon as={FaEdit} />}
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(task)
              }}
              _hover={{ transform: 'translateY(-1px)' }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              leftIcon={<Icon as={FaTrash} />}
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              _hover={{ transform: 'translateY(-1px)' }}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <TaskDetails
            task={task}
            onClose={onClose}
            onEdit={onEdit}
          />
        </ModalContent>
      </Modal>
    </>
  )
}

export default TaskCard 