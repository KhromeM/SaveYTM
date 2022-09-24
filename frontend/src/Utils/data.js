import { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
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
  const [userData, setUserData] = useState(false);

  const getSnapshot = (collection, document, setter) => () =>
    onSnapshot(doc(db, collection, document), doc => {
      setter(doc.data());
    });

  const getDocument = (collection, document, setter) => {
    getDoc(doc(db, collection, document)).then(doc => setter(doc.data()));
  };

  useEffect(() => {
    if (user) {
      getDocument('users', user.uid, setUserData);
    }
  }, [user]);

  return { userData, getSnapshot, getDocument };
};
