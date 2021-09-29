import React from 'react';
import pt from 'prop-types';

const Comment = ({ width = 2, height = 2, ...props }) => {
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
};

Comment.propTypes = {
  width: pt.number,
  height: pt.number,
};

export default Comment;
