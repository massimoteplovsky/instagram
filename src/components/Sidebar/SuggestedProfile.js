import React, { useState, useContext } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId,
} from '../../services/firebase';
import { LoggedInUserContext } from '../../context';

const SuggestedProfile = ({
  profileDocId,
  profileId,
  loggedInUserDocId,
  userId,
  username,
}) => {
  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  if (followed) return null;

  const handleFollowUser = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId);
    await updateFollowedUserFollowers(profileDocId, userId);
    const [user] = await getUserByUserId(userId);
    setActiveUser(user);
  };

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/profile/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  );
};

SuggestedProfile.propTypes = {
  profileDocId: pt.string.isRequired,
  username: pt.string.isRequired,
  profileId: pt.string.isRequired,
  userId: pt.string.isRequired,
  loggedInUserDocId: pt.string.isRequired,
};

export default SuggestedProfile;
