import { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { parse } from 'query-string';
import { getDocument } from '../../Utils/data.js';
import { useAuth } from '../../Utils/auth';
import MusicBar from '../MusicBar.js';

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
  const { videos } = playlist;
  const title = playlist.info.playlistTitle;
  const videoElements = videos.map((vid, index) => (
    <Box>
      <MusicBar
        key={nanoid()}
        vid={vid}
        index={index}
        playlist={videos}
        size={3}
      />
    </Box>
  ));

  return (
    <Box mt="10vh" textAlign="center" ml="auto" mr="auto" mb="15vh">
      <Heading m="5" size="lg">
        {'Playlist: ' + title}
      </Heading>
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
