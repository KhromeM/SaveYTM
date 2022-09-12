import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import MusicBox from './MusicBox';

export default function MusicGallery({ musicList }) {
  // feed MusicBox components a list of 4 music objects
  const musicBoxes = [];
  let tempHolder = [];
  musicList.forEach((musicObj, index) => {
    tempHolder.push(musicObj);
    if (tempHolder.length === 4 || index === musicList.length - 1) {
      musicBoxes.push(<MusicBox musicList={tempHolder} />);
      tempHolder = [];
    }
  });
  return (
    <Flex wrap="wrap" maxH="500" minH="500" minW="100vw">
      {musicBoxes}
    </Flex>
  );
}
