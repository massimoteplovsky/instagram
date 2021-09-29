import React, { useRef } from 'react';
import pt from 'prop-types';

// Components
import Header from './Header';
import Photo from './Photo';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ content }) => {
  const commentInput = useRef(null);
  const {
    username,
    imageSrc,
    caption,
    docId,
    userLikedPhoto,
    likes,
    comments,
    dateCreated,
  } = content;

  const handleFocus = () => {
    commentInput.current.focus();
  };

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={username} />
      <Photo src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        likes={likes}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
        username={username}
      />
    </div>
  );
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
