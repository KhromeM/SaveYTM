import { ChakraProvider, Box, DarkMode } from '@chakra-ui/react';
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <VideosProvider>
            <PlayerProvider>
              <DarkMode>
                <Box color="white">
                  <NavBar />
                  <Routing />
                  <BottomPlayer />
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
      {/* <Route path="/playlist" element={<PlaylistPage />} />
      <Route path="/deleted" element={<DeletedPage />} /> */}
    </Routes>
  );
}

function MainBody() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          <MusicGallery />
          <PlaylistPreview />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
