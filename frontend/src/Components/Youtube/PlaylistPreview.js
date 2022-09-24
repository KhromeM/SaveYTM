import MusicBox from '../MusicBox';
import { Text, Flex } from '@chakra-ui/react';
import { shuffle } from '../../Utils/functions';
import { useState, useEffect } from 'react';
import { useUser } from '../../Utils/data';

export default function PlaylistPreview() {
  const [playlists, setPlaylists] = useState([]);
  const { userData } = useUser();

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

  const previews = playlists.map((playlist, index) => {
    return <Helper playlist={playlist} key={index} />;
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
  const { getSnapshot, getDocument } = useUser();
  const [fullPlaylist, setFullPlaylist] = useState({});

  useEffect(() => {
    getDocument('playlists', playlist.playlistId, setFullPlaylist);
  }, []);
  // useEffect(() => {
  //   const func = getSnapshot('playlists', playlist.playlistId, setFullPlaylist);
  //   const unSub = func();
  //   return () => unSub();
  // }, []);

  let shuffled = [];
  if (fullPlaylist.videos) {
    shuffled = fullPlaylist.videos.slice();
  }
  shuffle(shuffled);
  return (
    <Flex flexDir="column" my="5">
      <Text fontSize="xl" as="b" ml="3">
        {playlist.playlistTitle}{' '}
      </Text>
      <MusicBox playlist={shuffled} />
    </Flex>
  );
};
