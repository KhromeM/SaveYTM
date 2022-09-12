import React from 'react';
import { ChakraProvider, Box, DarkMode, LightMode } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import MusicGallery from './Components/MusicGallery';
import { AuthProvider } from './Utils/auth';
import musicList from './data';
import BottomPlayer from './Components/Youtube/BottomPlayer';
import VideoPlayer from './Components/Youtube/VideoPlayer';
import PlaylistPreview from './Components/Youtube/PlaylistPreview';
import { PlayerProvider } from './Utils/player';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DarkMode>
          <PlayerProvider>
            <Box color="white">
              <NavBar />
              <MusicGallery musicList={musicList} />
              <VideoPlayer />
              <PlaylistPreview />
              <BottomPlayer />
            </Box>
          </PlayerProvider>
        </DarkMode>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
