import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';
import { usePlayer } from '../Utils/player';

export default function MusicBar({ vid, playlist, index }) {
  const { setPlayerStatus } = usePlayer();
  const { channel, thumbnail, title } = vid;

  const playThis = () => {
    setPlayerStatus({
      active: true,
      playlist: playlist.slice(index),
    });
  };
  return (
    <Flex
      minW="400"
      maxW="400"
      maxH="70"
      minH="70"
      alignItems="center"
      _hover={{ color: 'red.500' }}
      onClick={playThis}
      cursor="pointer"
    >
      <Image
        src={thumbnail}
        minH="58px"
        minW="103px"
        maxH="58px"
        maxW="103px"
        objectFit="cover"
        borderRadius="3px"
        alt={'Thumbnail of ' + title}
      />
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        textAlign="left"
        padding="3"
      >
        <Text fontSize="lg" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="sm"> {channel} </Text>
      </Flex>
      <hr color="red" />
    </Flex>
  );
}
