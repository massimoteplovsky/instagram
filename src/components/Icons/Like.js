import React from 'react';
import pt from 'prop-types';

const Like = ({ width = 2, height = 2, ...props }) => {
  return (
    <svg
      {...props}
      width={`${width}rem`}
      height={`${height}rem`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      tabIndex={0}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

Like.propTypes = {
  width: pt.number,
  height: pt.number,
};

export default Like;
