import { useState } from 'react';
import { ChakraProvider, Box, DarkMode, LightMode } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import MusicGallery from './Components/MusicGallery';
import { AuthProvider } from './Utils/auth';
import musicList from './data';
import BottomPlayer from './Components/Youtube/BottomPlayer';
import PlaylistPreview from './Components/Youtube/PlaylistPreview';

function App() {
  const [player, setPlayer] = useState(false);
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DarkMode>
          <Box color="white">
            <NavBar />
            <MusicGallery musicList={musicList} />
            <PlaylistPreview />
            <BottomPlayer />
          </Box>
        </DarkMode>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
