import React, { useContext } from 'react';
import { LoggedInUserContext } from '../../context';

// Components
import User from './User';
import Suggestion from './Suggestion';

const Sidebar = () => {
  const { user } = useContext(LoggedInUserContext);
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

export default Sidebar;
