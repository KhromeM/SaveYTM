import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Icon, Button } from '@chakra-ui/react';
import { parse } from 'query-string';
import { getSnapshot } from '../../Utils/data.js';
import { useAuth } from '../../Utils/auth';
import MusicBar from '../MusicBar.js';
import { upload } from '../../Utils/server.js';
import { nanoid } from 'nanoid';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BsArchive } from 'react-icons/bs';
export default function Playlist() {
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState({ videos: [] });
  const { playlistId } = parse(window.location.search);

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

      <Icon
        onClick={() => handleDownload(vid.videoId)}
        as={AiOutlineCloudDownload}
        fontSize={30}
        ml="auto"
        mr="10vw"
        cursor="pointer"
        _hover={{ color: 'red.500' }}
      />
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
          <Heading size="lg">{'Playlist: ' + title}</Heading>

          <Button
            bg="white"
            color="black"
            _hover={{ bg: 'red.500', color: 'white' }}
            onClick={handleUpload}
            ml="auto"
            mr="9.25vw"
            minW="120"
          >
            Archive
            <Icon as={BsArchive} fontSize={30} ml="5" cursor="pointer" />
          </Button>
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
