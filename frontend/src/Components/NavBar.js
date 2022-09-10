import { Box, Text, Flex, Button, Heading } from '@chakra-ui/react';
import { useAuth } from '../Utils/auth';
export default function NavBar() {
  return (
    <Flex
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
        <Signin />
      </Flex>
    </Flex>
  );
}

const Signin = () => {
  const { user, login, logout } = useAuth();
  const handleAuth = () => {
    user ? logout() : login();
  };
  return (
    <Box mr="10">
      <Button
        color="white"
        bg="red.600"
        onClick={handleAuth}
        colorScheme="red"
        size="md"
      >
        {user ? `Sign Out` : `Sign In`}
      </Button>
    </Box>
  );
};
