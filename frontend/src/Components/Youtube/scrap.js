const onReady = event => {
  const player = event.target;
  player.nextVideo();
  // player.setShuffle(true);
  // player.playVideoAt(0);
  // player.pauseVideo();
  // player.loadPlaylist(playlist,index)
  // event.target.hideVideoInfo();
  // .pauseVideo();
  // player.playVideo();
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
  // .getPlayerState()
};
const opts = {
  height: '100',
  width: '100',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    modestbranding: 1, //play on youtube logo bottom right
    playlist: playlist.join(','),
    iv_load_policy: 3,
    fs: 0, //full screen button
    controls: 1, // shows control buttons
    loop: 0,
    autoplay: 1,
    color: 'white',
    enablejsapi: 1,
    origin: window.location.origin,
  },
};
