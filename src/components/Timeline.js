import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { LoggedInUserContext } from '../context';
import usePhotos from '../hooks/usePhotos';

// Components
import Post from './Post';

const Timeline = () => {
  const { user } = useContext(LoggedInUserContext);
  const { userId, following } = user;

  const { photos, loading } = usePhotos(userId, following);

  if (loading) {
    return (
      <div className="container col-span-2">
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      </div>
    );
  }

  return (
    <div className="container col-span-2">
      {!following.length ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) : !photos?.length ? (
        <p className="flex justify-center font-bold">No user's photos</p>
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
};

export default Timeline;
