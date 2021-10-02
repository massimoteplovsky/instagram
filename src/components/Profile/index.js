import React, { useReducer, useEffect } from 'react';
import pt from 'prop-types';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserId } from '../../services/firebase';

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: user,
    photosCollection: null,
    followerCount: user.followers.length,
    followingCount: user.following.length,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
        followingCount: user.following.length,
      });
    };

    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        followerCount={followerCount}
        profile={profile}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

UserProfile.propTypes = {
  user: pt.shape({
    dateCreated: pt.number,
    emailAddress: pt.string,
    followers: pt.array,
    following: pt.array,
    fullName: pt.string,
    userId: pt.string,
    username: pt.string,
  }),
};

export default UserProfile;
