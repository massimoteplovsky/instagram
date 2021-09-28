import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context';
import { getUserByUserId } from '../services/firebase';

const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const [user] = await getUserByUserId(authUser.uid);
        localStorage.setItem('authUser', JSON.stringify(user));
        setUser(user);
        setLoading(false);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
        setLoading(false);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user, loading };
};

export default useAuth;
