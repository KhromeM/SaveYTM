import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Icon,
  Button,
} from '@chakra-ui/react';
import { BsPlayFill } from 'react-icons/bs';
import { FaForward, FaBackward } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';
export default function BottomPlayer() {
  const music = {
    thumbnail: 'https://i.ytimg.com/vi/GdzrrWA8e7A/maxresdefault.jpg',
    title:
      'One two three ahfjas fsj fshdlkj fghsflkjgh lksdf g lksfhdgkjl hsdfilgh isdlfhg ijsdhfigj',
    artist: 'FiveSix',
  };
  return (
    <Box
      minW="100vw"
      bg="youtube.gray"
      minH="65"
      maxH="65"
      position="fixed"
      bottom="0"
    >
      <Flex alignItems="center" minH="65" maxH="65">
        <Icon
          ml="5"
          as={FaBackward}
          fontSize={15}
          onClick={() => console.log('click')}
          cursor="pointer"
        />

        <Icon
          ml="5"
          as={BsPlayFill}
          fontSize={40}
          onClick={() => console.log('click')}
          cursor="pointer"
        />

        <Icon
          ml="5"
          as={FaForward}
          fontSize={15}
          onClick={() => console.log('click')}
          cursor="pointer"
        />

        <Flex
          minW="500"
          ml="auto"
          mr="auto"
          _hover={{ bg: 'red.800' }}
          justifyContent="center"
        >
          <Image
            mr="5"
            src={music.thumbnail}
            h="65"
            objectFit="cover"
            borderRadius="3px"
            alt={'Thumbnail of ' + music.title}
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="space-between"
            textAlign="left"
            padding="2"
            maxW="450"
          >
            <Text fontSize="lg" noOfLines={1}>
              {music.title}
            </Text>
            <Text fontSize="sm"> {music.artist} </Text>
          </Flex>
        </Flex>

        <Icon
          as={MdLoop}
          fontSize={25}
          onClick={() => console.log('click')}
          cursor="pointer"
        />

        <Icon
          ml="3"
          mr="7"
          as={AiFillSound}
          fontSize={20}
          onClick={() => console.log('click')}
          cursor="pointer"
        />
      </Flex>
    </Box>
  );
}
