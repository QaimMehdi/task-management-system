import { useState, useEffect } from 'react'
import {
  SimpleGrid,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Select,
  HStack,
  Input,
} from '@chakra-ui/react'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [...prev, newTask])
  }

  const handleTaskDeleted = (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId))
  }

  const handleTaskEdit = (task) => {
    setEditingTask(task)
    onOpen()
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ))
    setEditingTask(null)
    onClose()
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <Box>
      <HStack spacing={4} mb={6}>
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxW="300px"
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          maxW="200px"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredTasks.length === 0 ? (
          <Text textAlign="center" gridColumn="1 / -1" color="gray.500">
            No tasks found. Create one to get started!
          </Text>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleTaskDeleted}
              onEdit={handleTaskEdit}
            />
          ))
        )}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <TaskForm
              initialData={editingTask}
              onTaskCreated={handleTaskUpdated}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default TaskList 