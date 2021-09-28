import React, { useContext } from 'react';
import { UserContext } from '../context';
import useTitle from '../hooks/useTitle';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  useTitle('Instagram');

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
