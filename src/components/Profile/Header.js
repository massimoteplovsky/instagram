import React, { useState, useEffect, useContext } from 'react';
import pt from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from '../../services/firebase';
import { DEFAULT_IMAGE_PATH } from '../../constants';
import { UserContext } from '../../context';

const Header = ({
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullname,
    following,
    username: profileUsername,
  },
  photosCount,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useContext(UserContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState(
    user.following.includes(profileUserId)
  );
  const isMineAccount = user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
  };

  useEffect(() => {
    const toggleFollow = async () => {
      await updateLoggedInUserFollowing(
        user.docId,
        profileUserId,
        !isFollowingProfile
      );
      await updateFollowedUserFollowers(
        profileDocId,
        user.userId,
        !isFollowingProfile
      );
    };
    toggleFollow();
  }, [isFollowingProfile]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullname} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex w-full">
          <p className="text-2xl mr-3">{profileUsername}</p>
          {isMineAccount && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4 w-full">
          <p className="mr-10">
            <span className="font-bold">{photosCount}</span> posts
          </p>
          <p className="mr-10">
            <span className="font-bold">{followerCount}</span>
            {` `}
            {followerCount === 1 ? `follower` : `followers`}
          </p>
          <p className="mr-10">
            <span className="font-bold">{following.length}</span> following
          </p>
        </div>
        <div className="container mt-4 w-full">
          <p className="font-medium">{fullname ? fullname : null}</p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  photosCount: pt.number.isRequired,
  setFollowerCount: pt.func.isRequired,
  followerCount: pt.number.isRequired,
  profile: pt.shape({
    docId: pt.string,
    userId: pt.string,
    fullname: pt.string,
    username: pt.string,
    followers: pt.array,
    following: pt.array,
  }).isRequired,
};

export default Header;
