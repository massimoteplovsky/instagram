import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { getUserByUsername } from '../services/firebase';
import { Path } from '../constants';

//Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/Profile';

const Profile = () => {
  useTitle('Profile - instagram');
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isUserExist, setUserExist] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [user] = await getUserByUsername(username);

      if (user) {
        return setUser(user);
      }

      return setUserExist(false);
    };

    fetchData();
  }, [username]);

  if (!isUserExist) {
    return <Redirect to={Path.NOT_FOUND} />;
  }

  if (!user) return null;

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
