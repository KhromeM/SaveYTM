import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Icon,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
} from '@chakra-ui/react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { FaForward, FaBackward } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';
import Player from './Player';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { VideoSeekSlider } from 'react-video-seek-slider';
import 'react-video-seek-slider/styles.css';
import { usePlayer } from '../../Utils/player';
import { useAuth } from '../../Utils/auth';

const opts = {
  height: '0',
  width: '0',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    iv_load_policy: 3,
    fs: 0, //full screen button
    controls: 1, // shows control buttons
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

export default function BottomPlayer() {
  const { playerStatus } = usePlayer();
  const [player, setPlayer] = useState({ doesntExist: true });
  const [index, setIndex] = useState(0);
  const videoIds = playerStatus.playlist.map(video => video.videoId);
  const [playing, setPlaying] = useState(true);
  const { user } = useAuth();

  const onReady = event => {
    setPlayer(event.target);
    event.target.loadPlaylist(videoIds);
  };
  const onStateChange = ({ data }) => {
    setIndex(player.getPlaylistIndex());
    if (data === 2) {
      setPlaying(false);
    }
    if (data === 1) {
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (!player.doesntExist) {
      console.log(videoIds.slice(0, 3));
      player.loadPlaylist(videoIds);
    }
  }, [playerStatus]);

  if (!playerStatus.active || !user) {
    return <></>;
  }
  return (
    <div>
      <YouTube onStateChange={onStateChange} onReady={onReady} opts={opts} />
      <BottomPlayerIcons
        player={player}
        index={index}
        playControl={{ playing, setPlaying }}
      />
    </div>
  );
}

function BottomPlayerIcons({ player, index, playControl }) {
  const { playing, setPlaying } = playControl;
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(100);
  const [time, setTime] = useState(0);
  const { playerStatus } = usePlayer();

  const vid = playerStatus.playlist[index];
  if (vid) {
    document.title = `SaveYTM: ${vid.title}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && player.getCurrentTime) {
        setTime(player.getCurrentTime());

        // console.log('Volume: ' + player.getVolume());
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [playing, player]);

  const next = () => {
    player.nextVideo();
  };
  const previous = () => {
    if (player.getCurrentTime() > 30) {
      player.seekTo(0, true);
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
          maxH="80"
          position="fixed"
          bottom="0"
        >
          <ProgressBar player={player} loop={loop} time={time} />

          <Flex alignItems="center" minH="65" maxH="65">
            <Icon
              ml="7"
              as={FaBackward}
              fontSize={15}
              onClick={() => previous()}
              cursor="pointer"
            />

            <Icon
              mx={[2, 4]}
              as={getIcon()}
              fontSize={40}
              onClick={() => handlePlay()}
              cursor="pointer"
            />

            <Icon
              mr="5px"
              as={FaForward}
              fontSize={15}
              onClick={() => next()}
              cursor="pointer"
            />

            <ShowDuration player={player} time={time} />

            {vid && (
              <Flex
                minW={[100, 100, 500, 700, 900]}
                ml="auto"
                mr="auto"
                _hover={{ bg: 'red.800' }}
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={vid.thumbnail}
                  h={[0, 0, 50, 50, 58]}
                  objectFit="cover"
                  borderRadius="3px"
                  alt={'Thumbnail of ' + vid.title}
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  textAlign="left"
                  mx={['10px', '10px', '20px']}
                  maxW={[100, 200, 450, 650, 850]}
                >
                  <Text fontSize="lg" noOfLines={1}>
                    {vid.title}
                  </Text>
                  <Text fontSize="sm"> {vid.channel} </Text>
                </Flex>
              </Flex>
            )}

            <Icon
              ml="3"
              mr="12"
              as={MdLoop}
              fontSize={25}
              color={loop ? 'red' : 'white'}
              onClick={() => setLoop(!loop)}
              cursor="pointer"
            />

            {/* <Icon
              ml="3"
              mr="9"
              as={AiFillSound}
              fontSize={20}
              onClick={() => console.log('click')}
              cursor="pointer"
            /> */}
          </Flex>
        </Box>
      )}
    </>
  );
}

const ProgressBar = ({ player, loop, time }) => {
  time = time || 0;
  let dur = player.getDuration() || 3600;
  if (loop && time >= dur - 1) {
    player.seekTo(0, true);
  }
  const setCurrentTime = percentage => {
    const newTime = (percentage * dur) / 100;
    player.seekTo(newTime, true);
  };

  return (
    <Box minH="5" maxW="95%" m="auto" maxH="5" mt="0" mb="1">
      <Slider onChange={setCurrentTime} value={(time * 100) / dur}>
        <SliderTrack>
          <SliderFilledTrack bg="red" br="1" p="0" />
        </SliderTrack>
      </Slider>
    </Box>
  );
};

const ShowDuration = ({ player, time }) => {
  time = time || 0;
  let dur = player.getDuration() || 3600;
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
    <Box minW="65" mx={[3, 5]} textAlign="center">
      <Text> {formattedTime}</Text>

      <Text> {formattedDur}</Text>
    </Box>
  );
};
