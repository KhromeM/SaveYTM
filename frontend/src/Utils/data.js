import { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
import app from './firebase.js';
import { useAuth } from './auth.js';

const db = getFirestore(app);

const userContext = createContext();
export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const data = useGetUser();
  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
const getSnapshot = (collection, document, setter) => () =>
  onSnapshot(doc(db, collection, document), doc => {
    setter(doc.data());
  });

const getDocument = (collection, document, setter) => {
  getDoc(doc(db, collection, document)).then(doc => setter(doc.data()));
};

const useGetUser = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (user) {
      getDocument('users', user.uid, setUserData);
    }
  }, [user]);

  return { userData, getSnapshot, getDocument };
};

const videosContext = createContext();
export const useVideos = () => useContext(videosContext);

export const VideosProvider = ({ children }) => {
  const data = useGetVideos();
  return (
    <videosContext.Provider value={data}>{children}</videosContext.Provider>
  );
};

const useGetVideos = () => {
  const { user } = useAuth();
  const [userVideos, setUserVideos] = useState({ videos: [] });

  useEffect(() => {
    if (user) {
      getDocument('videos', user.uid, setUserVideos);
    }
  }, [user]);

  return userVideos;
};
