import MusicBox from '../MusicBox';
import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import { shuffle } from '../../Utils/functions';
import data from '../../data';

export default function PlaylistPreview({ playlist }) {
  playlist = playlist || { title: 'Test', music: data || [] };
  const shuffled = playlist.music.slice();
  shuffle(shuffled);
  return (
    <Flex justifyContent="center" flexDir="column" m="5vh" mb="10vh">
      <Heading> {playlist.title} </Heading>
      <MusicBox musicList={shuffled.slice(0, 4)} />
    </Flex>
  );
}
