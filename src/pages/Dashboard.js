import React from 'react';
import pt from 'prop-types';
import useTitle from '../hooks/useTitle';
import useUser from '../hooks/useUser';
import { LoggedInUserContext } from '../context';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ user: loggedInUser }) => {
  useTitle('Instagram');
  const { user, setActiveUser } = useUser(loggedInUser.userId);

  if (!user) return null;

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
        <Footer />
      </div>
    </LoggedInUserContext.Provider>
  );
};

Dashboard.propTypes = {
  user: pt.oneOfType([
    pt.shape({
      docId: pt.string,
      userId: pt.string,
      fullname: pt.string,
      username: pt.string,
      followers: pt.array,
      following: pt.array,
    }),
    pt.oneOf([null]),
  ]),
};

export default Dashboard;
