import { Text, Flex, Heading, Image, Box } from '@chakra-ui/react';
import { shuffle } from '../../Utils/functions';
import { useState, useEffect } from 'react';
import { useUser } from '../../Utils/data';
import { nanoid } from 'nanoid';

export default function PlaylistsPage() {
  const { userData } = useUser();
  let playlists = [];
  if (userData) {
    playlists = userData.playlists;
    console.log(playlists.length);
  }

  if (!playlists.length) {
    return (
      <Flex
        wrap="wrap"
        minH="100"
        minW="90vw"
        mx="3vw"
        mt="10vh"
        mb="5vh"
        justifyContent="center"
      >
        <Heading>You have no playlists</Heading>
      </Flex>
    );
  }
  const previews = playlists.map(playlist => {
    return <Helper playlist={playlist} key={nanoid()} />;
  });

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
      {previews}
    </Flex>
  );
}

const Helper = ({ playlist }) => {
  const sendToPlaylist = () => {};
  const h = 720 / 4.5;
  const w = 1280 / 4.5;
  return (
    <Box
      flexDir="column"
      m="5"
      borderWidth="1px"
      borderColor="white"
      color="white"
      _hover={{ color: 'red.500', borderColor: 'red.500' }}
      borderRadius="6px"
      textAlign="center"
      onClick={() => {}}
      p="15px"
      cursor={'pointer'}
    >
      <Text fontSize="2xl" as="b" ml="3">
        {playlist.playlistTitle}{' '}
      </Text>
      <Image
        src={playlist.thumbnail.url}
        minH={h}
        minW={w}
        maxH={h}
        maxW={w}
        objectFit="cover"
        borderRadius="10px"
        mt="2"
      />
    </Box>
  );
};