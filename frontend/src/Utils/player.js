import { useState, useEffect, useContext, createContext } from 'react';

const playerContext = createContext();

export const usePlayer = () => useContext(playerContext);

export const PlayerProvider = ({ children }) => {
  const player = useCreatePlayer();
  return (
    <playerContext.Provider value={player}>{children}</playerContext.Provider>
  );
};

const useCreatePlayer = () => {
  const [player, setPlayer] = useState(false);
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1, //play on youtube logo bottom right
      iv_load_policy: 3,
      fs: 0, //full screen button
      controls: 1, // shows control buttons
      loop: 0,
      autoplay: 0,
      color: 'white',
      enablejsapi: 1,
    },
  };

  return { player, setPlayer, opts };
};
