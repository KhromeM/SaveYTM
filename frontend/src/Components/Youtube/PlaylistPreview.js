import MusicBox from '../MusicBox';
import { Text, Flex, Heading } from '@chakra-ui/react';
import { shuffle } from '../../Utils/functions';
import { useState, useEffect } from 'react';
import { useUser, getSnapshot } from '../../Utils/data';
import { nanoid } from 'nanoid';
export default function PlaylistPreview() {
  const [playlists, setPlaylists] = useState([]);
  const { userData } = useUser();
  // console.log(userData);

  const getRandomPlaylists = (num, array) => {
    const returnArr = [];
    if (!array || !array.length) return returnArr;

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
    return <Helper playlist={playlist} key={nanoid()} />;
  });
  if (!playlists.length) {
    let message = 'You have no playlists. Create them on YouTube.';
    if (!userData) {
      message = `Give us access to your youtube account. Click the profile icon then "Give Access"`;
    }
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
        <Text fontSize={'2xl'}>{message}</Text>
      </Flex>
    );
  }

  return (
    <Flex wrap="wrap" minH="300" minW="74vw" mx="13vw">
      {previews}
    </Flex>
  );
}

const Helper = ({ playlist }) => {
  const [fullPlaylist, setFullPlaylist] = useState({});
  // useEffect(() => {
  //   getDocument('playlists', playlist.playlistId, setFullPlaylist);
  // }, []);
  useEffect(() => {
    const func = getSnapshot(
      'playlists',
      playlist.playlistId,
      setFullPlaylist,
      fullPlaylist
    );
    const unSub = func();
    return () => unSub();
  }, []);

  if (!playlist) {
    return <></>;
  }

  let shuffled = [];
  if (fullPlaylist.videos) {
    shuffled = fullPlaylist.videos.slice();
  }
  shuffle(shuffled);
  return (
    <Flex flexDir="column" my="5">
      <Text fontSize="xl" as="b" ml="3">
        {playlist.playlistTitle.toUpperCase()}
      </Text>
      <MusicBox playlist={shuffled} />
    </Flex>
  );
};
