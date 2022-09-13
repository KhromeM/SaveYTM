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

  return { player, setPlayer };
};
