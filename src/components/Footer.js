import React from 'react';
import getYear from 'date-fns/getYear';

const Footer = () => {
  return (
    <footer className="flex items-center h-16 bg-white border-t border-gray-primary">
      <div className="w-2/3 flex justify-center mx-auto">
        <p>© Instagram clone by maXimalist, {getYear(Date.now())}</p>
      </div>
    </footer>
  );
};

export default Footer;
