import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Icon,
  Button,
  Progress,
} from '@chakra-ui/react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { FaForward, FaBackward } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';
import Player from './Player';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';

const opts = {
  height: '0',
  width: '0',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    modestbranding: 1, //play on youtube logo bottom right
    iv_load_policy: 3,
    fs: 0, //full screen button
    controls: 1, // shows control buttons
    loop: 0,
    color: 'white',
    enablejsapi: 1,
  },
};

const music = {
  thumbnail: 'https://i.ytimg.com/vi/GdzrrWA8e7A/maxresdefault.jpg',
  title:
    'One two three ahfjas fsj fshdlkj fghsflkjgh lksdf g lksfhdgkjl hsdfilgh isdlfhg ijsdhfigj',
  artist: 'FiveSix',
};

export default function BottomPlayer({ playlist }) {
  playlist = playlist || [
    'GdzrrWA8e7A',
    'NHMAx7AmK70',
    'SZ1OTOzX1TE',
    'jgpJVI3tDbY',
    'KXKblsqEG3g',
    '_zL0AAf-01I',
    '2GjPQfdQfMY',
  ];
  const [player, setPlayer] = useState({ doesntExist: true });

  const onReady = event => {
    setPlayer(event.target);
    event.target.loadPlaylist(playlist);
  };
  return (
    <div>
      <YouTube onReady={onReady} opts={opts} />
      <BottomPlayerIcons player={player} />
    </div>
  );
}

function BottomPlayerIcons({ player }) {
  const [playing, setPlaying] = useState(null);
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);

  const next = () => {
    player.nextVideo();
  };
  const previous = () => {
    if (player.getCurrentTime() > 30) {
      player.playVideoAt(player.getPlaylistIndex());
    } else {
      player.previousVideo();
    }
  };

  const handlePlay = () => {
    if (!playing) {
      player.playVideo();
      setPlaying(true);
    } else {
      player.pauseVideo();
      setPlaying(false);
    }
  };

  const getIcon = () => {
    if (!playing) {
      return BsPlayFill;
    } else {
      return BsPauseFill;
    }
  };

  return (
    <>
      {player.doesntExist ? (
        <div> </div>
      ) : (
        <Box
          minW="100vw"
          bg="youtube.gray"
          minH="65"
          maxH="65"
          position="fixed"
          bottom="0"
        >
          {playing !== null && <ProgressBar player={player} />}
          <Flex alignItems="center" minH="65" maxH="65">
            <Icon
              ml="7"
              as={FaBackward}
              fontSize={15}
              onClick={() => previous()}
              cursor="pointer"
            />

            <Icon
              ml="5"
              as={getIcon()}
              fontSize={40}
              onClick={() => handlePlay()}
              cursor="pointer"
            />

            <Icon
              ml="5"
              mr="5"
              as={FaForward}
              fontSize={15}
              onClick={() => next()}
              cursor="pointer"
            />

            {playing !== null && <ShowDuration player={player} />}

            <Flex
              minW={[100, 250, 500, 700, 900]}
              ml="auto"
              mr="auto"
              _hover={{ bg: 'red.800' }}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                mr={(0, 0, 5, 5, 5)}
                ml={(0, 0, 3, 5, 5)}
                src={music.thumbnail}
                h={[0, 0, 50, 50, 65]}
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
                maxW={[100, 200, 450, 650, 850]}
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
              mr="9"
              as={AiFillSound}
              fontSize={20}
              onClick={() => console.log('click')}
              cursor="pointer"
            />
          </Flex>
        </Box>
      )}
    </>
  );
}

const ProgressBar = ({ player }) => {
  const [time, setTime] = useState(0);

  let dur = player.getDuration() || 3600;

  setTimeout(() => {
    let currentTime = player.getCurrentTime();
    setTime(currentTime);
  }, 1000);
  console.log(Math.floor(time));

  return (
    <Progress value={(time * 100) / dur} size="xs" bg="white" minW="100vw" />
  );
};

const ShowDuration = ({ player }) => {
  const [time, setTime] = useState(0);

  let dur = player.getDuration() || 3600;
  setTimeout(() => {
    let currentTime = player.getCurrentTime();

    setTime(currentTime);
  }, 1000);
  let formattedTime;
  let formattedDur;
  if (dur >= 3600) {
    formattedTime = new Date(time * 1000).toISOString().slice(11, 19);
    formattedDur = new Date(dur * 1000).toISOString().slice(11, 19);
  } else {
    formattedTime = new Date(time * 1000).toISOString().slice(14, 19);
    formattedDur = new Date(dur * 1000).toISOString().slice(14, 19);
  }

  return (
    <Box minW="65" mx={[2, 2, 5, 10, 10]}>
      <Text> {formattedTime}</Text>

      <Text> {formattedDur}</Text>
    </Box>
  );
};
