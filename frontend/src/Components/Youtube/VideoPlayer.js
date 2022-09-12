import YouTube from 'react-youtube';
import { Box, Text, Flex, Button, Heading, Image } from '@chakra-ui/react';

// class Example extends React.Component {
//   render() {
//     const opts = {
//       height: '390',
//       width: '640',
//       playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 1,
//       },
//     };

//     return (
//       <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
//     );
//   }

//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();
//   }
// }

export default function VideoPlayer({ playlist }) {
  playlist = playlist || [
    'FlJqvq9Ua7I',
    'tNideOigKaI',
    'Ftl7-aQgywM',
    'JwAjANmjajc',
  ];
  const id = playlist[0];
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1, //play on youtube logo bottom right
      playlist: playlist.join(','),
      iv_load_policy: 3,
      fs: 0, //full screen button
      controls: 1, // shows control buttons
      loop: 0,
      autoplay: 0,
      color: 'white',
      enablejsapi: 1,
    },
  };

  const onReady = event => {
    const player = event.target;
    player.setShuffle(true);
    player.playVideoAt(0);
    player.pauseVideo();
    // player.loadPlaylist(playlist,index)
    // event.target.hideVideoInfo();
    // .pauseVideo();
    // .playVideo()
    // .nextVideo();
    // .previousVideo()
    // .getDuration()
    // .getCurrentTime()
    // .getVolume()
    // .setVolme() // 0-100
    // .hideVideoInfo()
    // .isMuted()
    // .setShuffle()
    // .setLoop()
    // .unMute()
    // .mute()
    // .getApiInterface()
    // .playVideoAt(index:Number)
    // .loadPlaylist(playlist:Array)
    // .destroy()
  };

  return (
    <Box>
      <YouTube opts={opts} onReady={onReady} />
    </Box>
  );
}
