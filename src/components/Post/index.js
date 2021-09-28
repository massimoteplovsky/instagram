import React, { useRef } from 'react';
import pt from 'prop-types';

// Components
import Header from './Header';

const Post = ({ content }) => {
  return <div>I'm a post</div>;
};

Post.propTypes = {
  content: pt.shape({
    username: pt.string.isRequired,
    imageSrc: pt.string.isRequired,
    caption: pt.string.isRequired,
    docId: pt.string.isRequired,
    userLikedPhoto: pt.bool.isRequired,
    likes: pt.array.isRequired,
    comments: pt.array.isRequired,
    dateCreated: pt.number.isRequired,
  }),
};

export default Post;
