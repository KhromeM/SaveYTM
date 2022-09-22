import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useAuth } from '../Utils/auth';
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
      <Box ml="10">
        <Heading fontWeight="extrabold" size="xl">
          Save Youtube Music
        </Heading>
      </Box>
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
