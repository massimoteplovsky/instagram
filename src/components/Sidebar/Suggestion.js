import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
import { getSuggestedProfiles } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';

//Components
import SuggestedProfile from './SuggestedProfile';

const Suggestion = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    };
    fetchData();
  }, [userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} className="mt-5" />;
  }

  if (!profiles.length) return null;

  const handleChangeProfiles = (profileId) => {
    const newProfiles = profiles.filter(
      (profile) => profile.userId !== profileId
    );

    setProfiles(newProfiles);
  };

  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map(({ docId, username, userId }) => (
          <SuggestedProfile
            key={docId}
            profileDocId={docId}
            username={username}
            profileId={userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
            handleChangeProfiles={handleChangeProfiles}
          />
        ))}
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  userId: pt.string,
  following: pt.arrayOf(pt.string),
  loggedInUserDocId: pt.string,
};

export default Suggestion;
