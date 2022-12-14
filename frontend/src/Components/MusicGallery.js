import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import MusicBox from './MusicBox';
import { useState, useEffect } from 'react';
import { useVideos, useUser } from '../Utils/data';
import { shuffle } from '../Utils/functions';
import { nanoid } from 'nanoid';

export default function MusicGallery() {
  const { userData } = useUser();
  let videos = useVideos().videos;
  const previewLength = 6;

  if (videos.length === 0 || !userData) {
    return <></>;
  }

  // feed MusicBox components a list of 4 music objects
  const randPlaylists = [];
  const getShuffledPlaylist = videos => {
    let shuffled = videos.slice();
    shuffle(shuffled);

    const arr = [];
    for (const vid of shuffled) {
      arr.push(vid);
      if (arr.length === 40) break;
    }
    randPlaylists.push(arr);
  };
  while (randPlaylists.length < 6) {
    getShuffledPlaylist(videos);
  }
  const musicBoxes = randPlaylists.map(playlist => (
    <Flex flexDir="column" my="5" key={nanoid()}>
      <MusicBox playlist={playlist} previewLength={previewLength} />
    </Flex>
  ));

  return (
    <Box textAlign="center">
      <Heading> Random Order</Heading>
      <Flex
        wrap="wrap"
        minH="300"
        minW="74vw"
        mx="13vw"
        // justifyContent="center"
      >
        {musicBoxes}
      </Flex>
    </Box>
  );
}
