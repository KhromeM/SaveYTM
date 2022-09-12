import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';

export default function MusicBar({ title, thumbnail, artist }) {
  return (
    <Flex
      minW="400"
      maxW="400"
      maxH="70"
      minH="70"
      alignItems="center"
      //   borderRadius="3"
      _hover={{ bg: 'red.800' }}
    >
      <Image
        src={thumbnail}
        w="100"
        h="58"
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
        <Text fontSize="sm"> {artist} </Text>
      </Flex>
    </Flex>
  );
}
