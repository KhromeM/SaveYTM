import {
  Box,
  Flex,
  Button,
  Heading,
  Image,
  Show,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';

import { useAuth } from '../Utils/auth.js';
import { getOAuthLink, update } from '../Utils/server.js';
import logo from '../Resources/Logo/SaveYTM.svg';
import SearchBar from './Search/SearchBar.js';
import { MdLibraryMusic } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const goToPlaylists = () => {
    navigate('/playlists');
  };
  const goHome = () => {
    navigate('/');
  };
  return (
    <Flex
      bg="black"
      position="fixed"
      top="0"
      minW="100vw"
      maxW="100vw"
      height="7vh"
      alignItems="center"
      boxShadow="base"
    >
      <Flex onClick={goHome} cursor="pointer" alignItems="center">
        <Image src={logo} w="55px" mr="10px" ml="10px" />

        <Show breakpoint="(min-width: 800px)">
          <Heading
            fontWeight="extrabold"
            size="xl"
            _hover={{ color: 'red.500' }}
          >
            SaveYTM
          </Heading>
        </Show>
      </Flex>
      <SearchBar />

      <Icon
        as={MdLibraryMusic}
        fontSize={30}
        onClick={goToPlaylists}
        cursor="pointer"
        ml="auto"
        mr="20px"
        color="white"
        _hover={{ color: 'red.500' }}
      />

      <Flex mr="10">
        <Auth />
      </Flex>
    </Flex>
  );
}

const Auth = () => {
  const { user, login, logout } = useAuth();

  const handleAuth = () => {
    user ? logout() : login();
  };
  const handleOAuth = async () => {
    let idToken = await user.getIdToken(false);
    const { authURL } = await getOAuthLink(idToken);
    window.location.href = authURL;
  };

  const handleUpdate = async () => {
    let idToken = await user.getIdToken(false);
    const { authURL } = await update(idToken);
  };

  return (
    <Box>
      {user ? (
        <Menu>
          <MenuButton>
            <Image src={user.photoURL} borderRadius="full" boxSize="40px" />
          </MenuButton>
          <MenuList
            bg="youtube.gray"
            // _hover={{ bg: 'red.800' }}
          >
            {/* <MenuItem>Account</MenuItem> */}
            {/* <MenuItem>Settings</MenuItem>  */}
            <MenuItem onClick={handleOAuth}>Give Access</MenuItem>
            <MenuItem onClick={handleUpdate}>Update</MenuItem>

            <MenuItem onClick={handleAuth}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          color="white"
          bg="red.600"
          onClick={handleAuth}
          colorScheme="red"
          size="md"
        >
          {`Sign In`}
        </Button>
      )}
    </Box>
  );
};
