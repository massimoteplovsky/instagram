import React, { memo } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants';

const User = ({ username, fullname }) => {
  return (
    <Link
      to={`/profile/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  username: pt.string,
  fullname: pt.string,
};

export default memo(User);
