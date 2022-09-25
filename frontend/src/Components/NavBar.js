import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  Image,
  Show,
  Hide,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useAuth } from '../Utils/auth.js';
import { getOAuthLink, update } from '../Utils/server.js';
import logo from '../Resources/Logo/SaveYTM.svg';

export default function NavBar() {
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
      <Image src={logo} w="60px" mr="5px" ml="10px" />

      <Show breakpoint="(min-width: 1000px)">
        <Heading fontWeight="extrabold" size="xl">
          Save Youtube Music
        </Heading>
      </Show>

      {/* <Box ml="auto" mr="auto">
        <Text fontSize="2xl"> Playlists</Text>
      </Box> */}

      <Flex ml="auto" mr="10">
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
