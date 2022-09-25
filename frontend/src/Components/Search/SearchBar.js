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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useVideos } from '../../Utils/data';
import { fuzzy, search } from 'fast-fuzzy';

export default function SearchBar() {
  const videos = useVideos().videos;
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = e => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = () => {
    if (!videos.length) return;

    const results = search(searchTerm, videos, {
      keySelector: video => video.title,
    }).slice(0, 10);
    console.log(results);
  };
  if (searchTerm !== '') {
    handleSearch();
  }

  return (
    <Input
      variant="outline"
      placeholder="Search"
      minW={['50vw', '50vw', '40vw', '40vw', '40vw']}
      maxW={['50vw', '50vw', '40vw', '40vw', '40vw']}
      position="absolute"
      left={['15vw', '15vw', '30vw', '30vw', '30vw']}
      ml="auto"
      mr="aut0"
      borderColor="white"
      _hover={{ borderColor: 'red.500' }}
      _focusVisible={{ borderColor: 'red.500' }}
      value={searchTerm}
      onChange={onChange}
    />
  );
}
