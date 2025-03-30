import { useState } from 'react'
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

const TaskForm = ({ onTaskCreated, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create task')

      const newTask = await response.json()
      onTaskCreated?.(newTask)
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      })
      toast({
        title: 'Task created successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error creating task',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
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
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="medium">Due Date</FormLabel>
          <Input
            name="dueDate"
            type="datetime-local"
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
          isLoading={isSubmitting}
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