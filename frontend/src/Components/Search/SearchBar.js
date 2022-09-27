import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  Image,
  Show,
  Hide,
  Input,
  Scol,
} from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useState } from 'react';
import { useVideos } from '../../Utils/data';
import { search } from 'fast-fuzzy';
import MusicBar from '../MusicBar.js';
import { nanoid } from 'nanoid';

export default function SearchBar() {
  const videos = useVideos().videos;
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = e => {
    setSearchTerm(e.target.value);
    handleSearch();
    if (e.target.value) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const handleSearch = () => {
    if (!videos.length) return;
    const resultsNow = search(searchTerm, videos, {
      keySelector: video => video.title,
    }).slice(0, 30);
    setResults(resultsNow);
  };

  let searchResults = results.map(vid => (
    <MusicBar vid={vid} playlist={[vid]} key={nanoid()} size={3} index={0} />
  ));

  return (
    <>
      <Input
        variant="outline"
        placeholder="Search"
        minW={['50vw', '50vw', '40vw', '40vw', '40vw']}
        maxW={['50vw', '50vw', '40vw', '40vw', '40vw']}
        position="absolute"
        left={['15vw', '15vw', '30vw', '30vw', '30vw']}
        ml="auto"
        mr="auto"
        borderColor="white"
        _hover={{ borderColor: 'red.500' }}
        _focusVisible={{ borderColor: 'red.500' }}
        value={searchTerm}
        onChange={onChange}
      />

      <Modal isOpen={isOpen} size="4xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" bg="black">
          <ModalBody bg="black" color="white" borderRadius="2xl">
            <Flex direction="column" justifyContent="center" mx="10vw" my="2vh">
              <Input
                placeholder="Search"
                _hover={{ borderColor: 'red.500' }}
                _focusVisible={{ borderColor: 'red.500' }}
                value={searchTerm}
                onChange={onChange}
                mb="2vh"
              />
              <Box overflowY="scroll" maxH="600px">
                {searchResults}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
