import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);

const authContext = createContext();
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const auth = useAuthValue();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuthValue = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  const logout = () => {
    signOut(auth);
  };

  return { user, login, logout };
};
