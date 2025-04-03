import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Textarea,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { AuthContext } from '../App'

const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueDate, setDueDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { refreshTasks } = useContext(AuthContext)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate inputs
    if (!title.trim() || !description.trim() || !dueDate) {
      toast({
        title: 'Error',
        description: 'Title, description, and due date are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          status,
          dueDate: new Date(dueDate).toISOString(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create task')
      }

      // Reset form
      setTitle('')
      setDescription('')
      setStatus('pending')
      setDueDate('')

      toast({
        title: 'Success',
        description: 'Task created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      // Trigger task list refresh
      refreshTasks()
    } catch (error) {
      console.error('Error creating task:', error)
      
      toast({
        title: 'Error',
        description: error.message || 'Failed to create task. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      bg={bgColor}
      p={6} 
      borderRadius="lg" 
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      w="full"
      maxW="600px"
      mx="auto"
      mb={8}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="lg" color={useColorModeValue('gray.700', 'white')}>
          Create New Task
        </Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            size="md"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            size="md"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="md"
          isLoading={isLoading}
          loadingText="Creating..."
          leftIcon={<FaPlus />}
        >
          Create Task
        </Button>
      </VStack>
    </Box>
  )
}

export default TaskForm 