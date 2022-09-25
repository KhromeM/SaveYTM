import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import MusicBar from './MusicBar';
import { nanoid } from 'nanoid';

export default function MusicBox({ playlist, previewLength = 4 }) {
  const preview = playlist.slice(0, previewLength);
  const musicBarList = preview.map((vid, index) => {
    return (
      <MusicBar key={nanoid()} vid={vid} index={index} playlist={playlist} />
    );
  });
  return <Box m="3">{musicBarList}</Box>;
}
