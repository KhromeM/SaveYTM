import { createContext, useContext, useState, useEffect } from 'react';
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  collection,
} from 'firebase/firestore';
import app from './firebase.js';
import { useAuth } from './auth.js';

const db = getFirestore(app);
const usersRef = collection(db, 'users');
const playlistsRef = collection(db, 'playlists');

const dataContext = createContext();
export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const data = useGetData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

const useGetData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(false);

  const getSnapshot = (collection, document, setter) => () =>
    onSnapshot(doc(db, collection, document), doc => {
      setter(doc.data());
    });

  useEffect(() => {
    const func = getSnapshot('users', user.uid, setUserData);
    if (user) {
      const unSub = func();
      return () => {
        unSub();
      };
    }
  }, [user]);

  return { userData, getSnapshot };
};
