import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Flex,
  extendTheme,
} from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import { AuthProvider } from './Utils/auth';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box textAlign="center" fontSize="xl" minW="100vw" minH="100vh">
          <NavBar />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
