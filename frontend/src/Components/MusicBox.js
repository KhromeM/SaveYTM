import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import MusicBar from './MusicBar';

export default function MusicBox({ musicList }) {
  const musicBarList = musicList.map((music, index) => {
    return (
      <MusicBar
        key={index}
        artist={music.artist}
        title={music.title}
        thumbnail={music.thumbnail}
      />
    );
  });
  return <Box m="3">{musicBarList}</Box>;
}
