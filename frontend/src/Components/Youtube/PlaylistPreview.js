import MusicBox from '../MusicBox';
import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import { shuffle } from '../../Utils/functions';
import { useState, useEffect } from 'react';
import { useData } from '../../Utils/data';

export default function PlaylistPreview({ playlist }) {
  const [playlists, setPlaylists] = useState([]);
  const { userData } = useData();

  const getRandomPlaylists = (num, array) => {
    const returnArr = [];
    for (let i = 0; i < num; i++) {
      const randIndex = Math.floor(Math.random() * array.length);
      returnArr.push(array[randIndex]);
    }
    return returnArr;
  };
  useEffect(() => {
    const func = () => setPlaylists(getRandomPlaylists(6, userData.playlists));
    if (userData) {
      func();
    }
  }, [userData]);

  const previews = playlists.map(playlist => {
    return <Helper playlist={playlist} />;
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
  const { getSnapshot } = useData();
  const [fullPlaylist, setFullPlaylist] = useState({});
  useEffect(() => {
    const func = getSnapshot('playlists', playlist.playlistId, setFullPlaylist);
    const unSub = func();
    return () => unSub();
  }, []);

  let shuffled = [];
  if (fullPlaylist.videos) {
    shuffled = fullPlaylist.videos.slice();
  }
  shuffle(shuffled);
  return (
    <Flex flexDir="column" my="5">
      <Text fontSize="xl" as="b">
        {playlist.playlistTitle}{' '}
      </Text>
      <MusicBox playlist={shuffled} />
    </Flex>
  );
};
