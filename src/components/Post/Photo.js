import React from 'react';
import pt from 'prop-types';

const Photo = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

Photo.propTypes = {
  src: pt.string.isRequired,
  caption: pt.string.isRequired,
};

export default Photo;
