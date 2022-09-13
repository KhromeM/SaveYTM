// import { useState } from 'react';
// const videoIdA = 'XxVg_s8xAms';
// const videoIdB = '-DX3vJiqxm4';

// function VideoPlayer() {
//   const [videoId, setVideoId] = useState(videoIdA);
//   const [player, setPlayer] = useState(null);

//   onReady = event => {
//     console.log(
//       `YouTube Player object for videoId: "${videoId}" has been saved .`
//     );
//     this.setState({
//       player: event.target,
//     });
//   };

//   onPlay = event => {
//     this.setState({
//       title: this.state.player.getVideoData().title,
//     });
//   };

//   onPlayVideo = () => {
//     this.state.player.playVideo();
//   };

//   onPauseVideo = () => {
//     this.state.player.pauseVideo();
//   };

//   onChangeVideo = () => {
//     this.setState({
//       videoId: this.state.videoId === videoIdA ? videoIdB : videoIdA,
//     });
//   };

//   return (
//     <div>
//       <h1>{this.state.title}</h1>
//       <YouTube
//         videoId={this.state.videoId}
//         onReady={this.onReady}
//         onPlay={this.onPlay}
//       />
//       <button onClick={this.onPlayVideo}>Play</button>
//       <button onClick={this.onPauseVideo}>Pause</button>
//       <button onClick={this.onChangeVideo}>Change Video</button>
//     </div>
//   );
// }
