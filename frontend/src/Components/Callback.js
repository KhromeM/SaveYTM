import { useAuth } from '../Utils/auth.js';
import { useEffect } from 'react';
import { parse } from 'query-string';
import { giveOAuth } from '../Utils/server.js';
import { Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const navigate = useNavigate();
  const { user } = useAuth();
  let code = parse(window.location.search).code;
  useEffect(() => {
    const func = async () => {
      let idToken = await user.getIdToken(false);
      const result = await giveOAuth(code, idToken);
      navigate('/');
    };
    if (user) {
      func();
    }
  }, [user]);
  return (
    <Flex
      wrap="wrap"
      minH="300"
      minW="90vw"
      mx="3vw"
      mt="10vh"
      mb="5vh"
      justifyContent="center"
    >
      <Heading>Loading...</Heading>
    </Flex>
  );
}
