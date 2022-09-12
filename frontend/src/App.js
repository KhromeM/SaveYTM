import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import MusicGallery from './Components/MusicGallery';
import { AuthProvider } from './Utils/auth';
import musicList from './data';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box textAlign="center" fontSize="xl" minW="100vw" minH="100vh">
          <NavBar />
          <MusicGallery musicList={musicList} />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
