import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import MusicBox from './MusicBox';
import { useState, useEffect } from 'react';
import { useVideos } from '../Utils/data';
import { shuffle } from '../Utils/functions';

export default function MusicGallery() {
  let videos = useVideos().videos;
  const previewLength = 6;

  if (videos.length === 0) {
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
    <Flex flexDir="column" my="5">
      <MusicBox playlist={playlist} previewLength={previewLength} />
    </Flex>
  ));

  return (
    <Box mt="10vh" textAlign="center">
      <Heading> Random Order</Heading>
      <Flex
        wrap="wrap"
        minH="300"
        minW="90vw"
        mx="3vw"
        mb="5vh"
        justifyContent="center"
      >
        {musicBoxes}
      </Flex>
    </Box>
  );
}
