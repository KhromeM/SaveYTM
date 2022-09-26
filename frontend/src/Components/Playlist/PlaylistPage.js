import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Icon, Button } from '@chakra-ui/react';
import { parse } from 'query-string';
import { getDocument } from '../../Utils/data.js';
import { useAuth } from '../../Utils/auth';
import MusicBar from '../MusicBar.js';
import { upload } from '../../Utils/server.js';
import { nanoid } from 'nanoid';

export default function Playlist() {
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState({ videos: [] });
  const { playlistId } = parse(window.location.search);
  useEffect(() => {
    getDocument('playlists', playlistId, setPlaylist, playlist);
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
      <Button
        colorScheme="red"
        bg="red.500"
        onClick={() => handleDownload(vid.videoId)}
        ml="auto"
        mr="10vw"
      >
        Download
      </Button>
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
            colorScheme="red"
            bg="red.500"
            onClick={handleUpload}
            ml="auto"
            mr="9.25vw"
            minW="120"
          >
            Archive
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
