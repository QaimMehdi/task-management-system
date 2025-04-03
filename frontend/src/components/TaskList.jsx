import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Select,
  SimpleGrid,
  useToast,
  Spinner,
  Text,
  useColorModeValue,
  Skeleton,
  useBreakpointValue,
  HStack,
  IconButton,
  Tooltip,
  Center,
} from '@chakra-ui/react'
import TaskCard from './TaskCard'
import { AuthContext } from '../App'
import { SearchIcon } from '@chakra-ui/icons'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const toast = useToast()
  const { tasksVersion, refreshTasks } = useContext(AuthContext)

  const columns = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 5
  })

  const spacing = useBreakpointValue({
    base: 4,
    sm: 5,
    md: 6,
    lg: 6,
    xl: 8
  })

  const filterBarWidth = useBreakpointValue({
    base: "full",
    sm: "full",
    md: "full",
    lg: "full",
    xl: "80%"
  })

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch tasks')
        }

        const data = await response.json()
        setTasks(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [tasksVersion, toast])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete task')
      }

      refreshTasks() // Refresh the task list
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'in-progress' :
                       currentStatus === 'in-progress' ? 'completed' : 'pending'
      
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to update task')
      }

      refreshTasks() // Refresh the task list
      toast({
        title: 'Success',
        description: `Task status updated to ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update task status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <VStack spacing={spacing} align="stretch" w="full">
      <Box
        p={{ base: 3, sm: 4, md: 5, lg: 6 }}
        bg={bgColor}
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
        w={filterBarWidth}
        mx="auto"
      >
        <VStack spacing={4} align="stretch">
          <HStack 
            spacing={{ base: 2, sm: 4, md: 6 }} 
            align="start"
            flexDir={{ base: 'column', sm: 'row' }}
            w="full"
          >
            <Box flex="1" position="relative" w="full">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                pl="40px"
                size={{ base: "sm", md: "md", lg: "lg" }}
                w="full"
              />
              <IconButton
                icon={<SearchIcon />}
                aria-label="Search"
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                variant="ghost"
                size={{ base: "sm", md: "md" }}
                color="gray.500"
              />
            </Box>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size={{ base: "sm", md: "md", lg: "lg" }}
              w={{ base: "full", sm: "200px", lg: "250px" }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </HStack>
        </VStack>
      </Box>

      {loading ? (
        <SimpleGrid 
          columns={columns} 
          spacing={spacing} 
          w="full"
          px={{ base: 0, lg: 4, xl: 6 }}
        >
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} height="200px" borderRadius="lg" />
          ))}
        </SimpleGrid>
      ) : filteredTasks.length === 0 ? (
        <Box
          p={6}
          textAlign="center"
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
          w={{ base: "full", xl: "80%" }}
          mx="auto"
        >
          <Text color="gray.500">No tasks found</Text>
        </Box>
      ) : (
        <SimpleGrid 
          columns={columns} 
          spacing={spacing}
          w="full"
          alignItems="stretch"
          px={{ base: 0, lg: 4, xl: 6 }}
        >
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}

export default TaskList 