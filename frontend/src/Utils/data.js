import { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore.js';
import app from './firebase.js';
import { useAuth } from './auth.js';
const db = getFirestore(app);

const dataContext = createContext();
export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const data = useGetData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

const useGetData = () => {
  const { user } = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'user', user.uid), doc => {
      setData(doc.data());
    });
    return () => unSub();
  }, [user]);

  return data;
};
