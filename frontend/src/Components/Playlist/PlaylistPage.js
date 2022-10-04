import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Icon, Button } from '@chakra-ui/react';
import { parse } from 'query-string';
import { getSnapshot } from '../../Utils/data.js';
import { useAuth } from '../../Utils/auth';
import MusicBar from '../MusicBar.js';
import { upload } from '../../Utils/server.js';
import { nanoid } from 'nanoid';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { ImShuffle } from 'react-icons/im';
import { BsArchive, BsShuffle } from 'react-icons/bs';
import { usePlayer } from '../../Utils/player.js';
import { shuffle } from '../../Utils/functions.js';

export default function Playlist() {
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState({ videos: [] });
  const { playlistId } = parse(window.location.search);
  const { setPlayerStatus } = usePlayer();

  const playShuffle = () => {
    const shuffled = playlist.videos.slice();
    shuffle(shuffled);
    setPlayerStatus({
      active: true,
      playlist: shuffled,
    });
  };

  // useEffect(() => {
  //   getDocument('playlists', playlistId, setPlaylist, playlist);
  // }, [user]);

  useEffect(() => {
    const unSub = getSnapshot('playlists', playlistId, setPlaylist, playlist)();
    return () => unSub();
  }, [user]);

  if (!playlist.info) {
    return (
      <Box>
        <Heading m="5" size="lg">
          {'Playlist: ' + playlistId + ' does not exist'}
        </Heading>
      </Box>
    );
  }
  const handleUpload = async () => {
    let idToken = await user.getIdToken(false);
    const res = await upload(playlist, idToken);
  };
  const handleDownload = videoId => {
    const url = `https://saveytm.s3.amazonaws.com/${user.uid}/${videoId}.webm`;
    window.open(url);
  };
  const { videos } = playlist;
  const title = playlist.info.playlistTitle;
  const videoElements = videos.map((vid, index) => (
    <Flex alignItems="center">
      <MusicBar
        key={nanoid()}
        vid={vid}
        index={index}
        playlist={videos}
        size={4}
      />
      {user && (
        <Icon
          onClick={() => handleDownload(vid.videoId)}
          as={AiOutlineCloudDownload}
          fontSize={30}
          ml="auto"
          mr="10vw"
          cursor="pointer"
          _hover={{ color: 'red.500' }}
        />
      )}
    </Flex>
  ));

  return (
    <Box mt="10vh" ml="auto" mr="auto" mb="15vh">
      <Flex
        minW="90vw"
        // mx="13vw"
        mb="3vh"
        direction="column"
        ml="10vw"
      >
        <Flex>
          <Heading size="lg">{title.toUpperCase()}</Heading>

          <Icon
            as={BsShuffle}
            fontSize={30}
            cursor="pointer"
            color="white"
            _hover={{ color: 'red' }}
            onClick={playShuffle}
            ml="auto"
            mr="5"
          />
          {user ? (
            <Icon
              as={BsArchive}
              fontSize={30}
              cursor="pointer"
              color="white"
              _hover={{ color: 'red' }}
              onClick={handleUpload}
              mr="10vw"
            />
          ) : (
            <Box mr="5vw"></Box>
          )}
        </Flex>
      </Flex>
      <Flex
        wrap="wrap"
        minH="300"
        minW="90vw"
        // mx="13vw"
        mb="5vh"
        direction="column"
        ml="10vw"
      >
        {videoElements}
      </Flex>
    </Box>
  );
}
