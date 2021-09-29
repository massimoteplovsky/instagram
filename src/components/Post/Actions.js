import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import pt from 'prop-types';
import UserContext from '../../context/user';
import { toggleLikedPhoto } from '../../services/firebase';

// Components
import Like from '../Icons/Like';
import Comment from '../Icons/Comment';

const Actions = ({ docId, likes, likedPhoto, handleFocus }) => {
  const { user } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likesList, setLikes] = useState(likes);
  //   const [showModal, setShowModal] = useState(false);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await toggleLikedPhoto(docId, user.userId, toggleLiked);

    setLikes((prevLikesList) =>
      !toggleLiked
        ? [...prevLikesList, user]
        : [...prevLikesList.filter((like) => like.userId !== user.userId)]
    );
  };

  //   const handleToggleLikesModal = () => {
  //     setShowModal((showModal) => !showModal);
  //   };

  const renderLikes = () => {
    if (likesList.length === 1) {
      return (
        <Link to={`/profile/${likesList[0]}`}>
          <b>{likesList[0].username}</b> likes
        </Link>
      );
    }

    if (likesList.length > 1) {
      return (
        <span>
          <Link to={`/profile/${likesList[0]}`}>
            <b>{likesList[0].username}</b>
          </Link>{' '}
          likes and <b>{likesList.length - 1} more...</b>
        </span>
      );
    }
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <Like
            width={2}
            height={2}
            className={`mr-4 select-none cursor-pointer focus:outline-none ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
            onClick={handleToggleLiked}
          />
          <Comment
            width={2}
            height={2}
            className="text-black-light select-none cursor-pointer focus:outline-none"
            onClick={handleFocus}
          />
        </div>
      </div>
      {likesList.length > 0 && (
        <div className="px-4 pb-4">
          <p>{renderLikes()}</p>
        </div>
      )}
    </>
  );
};

Actions.propTypes = {
  docId: pt.string.isRequired,
  likes: pt.array.isRequired,
  likedPhoto: pt.bool.isRequired,
  handleFocus: pt.func.isRequired,
};

export default Actions;
