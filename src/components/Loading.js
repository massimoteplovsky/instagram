import React from 'react';

// Components
import Instagram from './Icons/Instagram';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-2/3 mx-auto h-screen">
      <Instagram />
      <img src="/images/logo.png" alt="Instagram" className="mt-4" />
    </div>
  );
};

export default Loading;
