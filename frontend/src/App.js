import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import MusicGallery from './Components/MusicGallery';
import { AuthProvider } from './Utils/auth';
import musicList from './data';
import BottomPlayer from './Components/Youtube/BottomPlayer';
import VideoPlayer from './Components/Youtube/VideoPlayer';
import PlaylistPreview from './Components/Youtube/PlaylistPreview';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <NavBar />
        <MusicGallery musicList={musicList} />
        <VideoPlayer />
        <PlaylistPreview />
        <BottomPlayer />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
