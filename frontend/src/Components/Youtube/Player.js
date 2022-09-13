import YouTube from 'react-youtube';

const Player = ({ playlist }) => {
  playlist = playlist || [
    'JwAjANmjajc',
    'FlJqvq9Ua7I',
    'tNideOigKaI',
    'Ftl7-aQgywM',
  ];
  const opts = {
    height: '270',
    width: '480',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      modestbranding: 1, //play on youtube logo bottom right
      iv_load_policy: 3,
      playlist: playlist.join(','),
      fs: 0, //full screen button
      controls: 1, // shows control buttons
      loop: 0,
      color: 'white',
      enablejsapi: 1,
    },
  };
  const onReady = event => {
    const player = event.target;
    // player.loadPlaylist(playlist);
    // player.playVideo();
  };

  return <YouTube opts={opts} onReady={onReady} />;
};

export default Player;
