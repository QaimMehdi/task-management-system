import React, { useState } from 'react'
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
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { taskService } from '../services/taskService'

const TaskForm = ({ onTaskCreated, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newTask = await taskService.createTask(formData)
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      })
      onTaskCreated(newTask)
      toast({
        title: 'Success',
        description: 'Task created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      p={6} 
      bg={bgColor}
      rounded="xl" 
      shadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)', transition: 'all 0.2s' }}
    >
      <VStack spacing={6} align="stretch">
        <Heading size="md" color="blue.600" display="flex" alignItems="center" gap={2}>
          <Icon as={initialData ? FaEdit : FaPlus} />
          {initialData ? 'Edit Task' : 'Create New Task'}
        </Heading>

        <FormControl isRequired>
          <FormLabel fontWeight="medium">Title</FormLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            size="lg"
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="medium">Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            size="lg"
            rows={4}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="medium">Status</FormLabel>
          <Select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            size="lg"
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="medium">Due Date</FormLabel>
          <Input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            size="lg"
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={loading}
          loadingText={initialData ? 'Updating...' : 'Creating...'}
          leftIcon={<Icon as={initialData ? FaEdit : FaPlus} />}
          _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </VStack>
    </Box>
  )
}

export default TaskForm 