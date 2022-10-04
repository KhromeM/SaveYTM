import { ChakraProvider, Box, DarkMode, Flex, Text } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './Components/NavBar';
import MusicGallery from './Components/MusicGallery';
import { AuthProvider } from './Utils/auth';
import BottomPlayer from './Components/Youtube/BottomPlayer';
import PlaylistPreview from './Components/Youtube/PlaylistPreview';
import { useAuth } from './Utils/auth.js';
import { Routes, Route } from 'react-router-dom';
import Callback from './Components/Callback.js';
import { UserProvider, VideosProvider } from './Utils/data.js';
import { PlayerProvider } from './Utils/player.js';
import PlaylistsPage from './Components/Playlist/PlaylistsPage';
import PlaylistPage from './Components/Playlist/PlaylistPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <VideosProvider>
            <PlayerProvider>
              <DarkMode>
                <Box color="white" sx={css}>
                  <NavBar />
                  <Box my="10vh">
                    <Routing />
                    <BottomPlayer />
                  </Box>
                </Box>
              </DarkMode>
            </PlayerProvider>
          </VideosProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<MainBody />} />
      <Route path="/auth/google/callback" element={<Callback />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/playlist" element={<PlaylistPage />} />
      {/* <Route path="/deleted" element={<DeletedPage />} />  */}
    </Routes>
  );
}

function MainBody() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          <PlaylistPreview />
          <Box mb="6vh"></Box>
          <MusicGallery />
        </>
      ) : (
        <>
          <Flex
            minW="94vw"
            mx="3vw"
            my="5vh"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize={'4xl'}>
              Log in and give access to YouTube to play your own playlists!
            </Text>
          </Flex>
          <PlaylistPreview />
          <Box mb="6vh"></Box>
          <MusicGallery />
        </>
      )}
    </>
  );
}

const css = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'black',
    borderRadius: '24px',
  },
};

export default App;
