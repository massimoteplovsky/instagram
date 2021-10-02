import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { Path } from '../constants';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  useTitle('Not Found - Instagram');

  return (
    <div className="flex flex-col bg-gray-background h-screen">
      <Header />
      <div className="mx-auto flex flex-col flex-grow items-center justify-start max-w-screen-lg">
        <h2 className="text-lg font-bold mb-10">
          Unfortunately, this page is not available!
        </h2>
        <p>
          You may have used an invalid link or the page has been deleted. Back
          to <Link to={Path.DASHBOARD}>Instagram</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
