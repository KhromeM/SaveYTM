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
export const getSnapshot = (collection, document, setter, placeholder) => () =>
  onSnapshot(doc(db, collection, document), doc => {
    setter(doc.data() || placeholder);
  });

export const getDocument = (collection, document, setter, placeholder) => {
  getDoc(doc(db, collection, document)).then(doc => {
    setter(doc.data() || placeholder);
  });
};

const useGetUser = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     getDocument('users', user.uid, setUserData);
  //   } else {
  //     setUserData(false);
  //   }
  // }, [user]);
  useEffect(() => {
    if (user) {
      const func = getSnapshot('users', user.uid, setUserData);
      const unSub = func();
      return () => unSub();
    } else {
      setUserData(false);
    }
  }, [user]);

  return { userData };
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

  let set = new Set();
  let filteredVideos = userVideos.videos.filter(vid => {
    if (set.has(vid.videoId)) {
      return false;
    }
    set.add(vid.videoId);
    return true;
  });

  // useEffect(() => {
  //   if (user) {
  //     getDocument('videos', user.uid, setUserVideos, userVideos);
  //   } else {
  //     setUserVideos({ videos: [] });
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      const func = getSnapshot('videos', user.uid, setUserVideos, userVideos);
      const unSub = func();
      return () => unSub();
    } else {
      setUserVideos({ videos: [] });
    }
  }, [user]);

  return { videos: filteredVideos };
};
