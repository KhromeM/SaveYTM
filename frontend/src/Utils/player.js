import { createContext, useContext, useState } from 'react';

const playerContext = createContext();
export const usePlayer = () => useContext(playerContext);

export const PlayerProvider = ({ children }) => {
  const value = useGetPlayerStatus();
  return (
    <playerContext.Provider value={value}>{children}</playerContext.Provider>
  );
};

const useGetPlayerStatus = () => {
  const [playerStatus, setPlayerStatus] = useState({
    active: false,
    playlist: [],
  });
  return { playerStatus, setPlayerStatus };
};
