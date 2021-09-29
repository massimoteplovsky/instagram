import React from 'react';
import { Link } from 'react-router-dom';
import pt from 'prop-types';

const Footer = ({ caption, username }) => {
  return (
    <div className="p-4 pt-0 pb-4">
      <Link to={`/profile/${username}`} className="mr-1 font-bold">
        {username}
      </Link>
      <span className="italic">{caption}</span>
    </div>
  );
};

Footer.propTypes = {
  caption: pt.string.isRequired,
  username: pt.string.isRequired,
};

export default Footer;
