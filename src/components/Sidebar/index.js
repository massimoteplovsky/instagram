import React, { useState, useContext, memo } from 'react';
import { UserContext } from '../../context';

// Components
import User from './User';
import Suggestion from './Suggestion';

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const { username, fullname, userId, following, docId } = user;

  return (
    <div className="p-4">
      <User username={username} fullname={fullname} />
      <Suggestion
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default memo(Sidebar);

Sidebar.whyDidYouRender = true;
