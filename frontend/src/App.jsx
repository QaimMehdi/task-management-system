import { ChakraProvider, Box, Container, Heading, VStack, useToast, Text, Flex } from '@chakra-ui/react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

function App() {
  const toast = useToast()

  const handleTaskCreated = (newTask) => {
    toast({
      title: 'Task created successfully',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <ChakraProvider>
      <Box 
        minH="100vh" 
        bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
        py={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Flex direction="column" align="center" mb={4}>
              <Heading 
                textAlign="center" 
                color="blue.600"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                mb={2}
                textShadow="2px 2px 4px rgba(0,0,0,0.1)"
              >
                Task Management System
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Organize your tasks efficiently and boost productivity
              </Text>
            </Flex>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
