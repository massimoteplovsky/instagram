import React, { useState } from 'react';
import pt from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

// Components
import AddComment from './AddComment';

const MINIMAL_COMMENTS_COUNT = 3;
const MORE_COMMENTS_COUNT = 3;

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(MINIMAL_COMMENTS_COUNT);
  const [commentsCount, setCommentsCount] = useState(
    comments.length - MINIMAL_COMMENTS_COUNT
  );

  const handleSetComments = (commentData) => {
    setComments([commentData, ...comments]);
    setCommentsCount(commentsCount + 1);
  };

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + MORE_COMMENTS_COUNT);
    setCommentsCount((commentsCount) => commentsCount - MORE_COMMENTS_COUNT);
  };

  const hideComments = () => {
    setCommentsSlice(MINIMAL_COMMENTS_COUNT);
    setCommentsCount(comments.length - MINIMAL_COMMENTS_COUNT);
  };

  const renderPreviewComments = () => {
    return comments
      .slice(0, commentsSlice)
      .map(({ comment, displayName, createdDate }) => (
        <div key={`${comment}-${displayName}`} className="mb-1">
          <Link to={`/profile/${displayName}`}>
            <span className="mr-1 font-bold">{displayName}</span>
          </Link>
          <span>{comment}</span>
          {` `}
          <p className="text-xs">
            {formatDistance(createdDate, new Date())} ago
          </p>
        </div>
      ));
  };

  return (
    <>
      <div className="p-4 pt-0 pb-4">
        {comments.length > MINIMAL_COMMENTS_COUNT &&
          commentsSlice < comments.length && (
            <button
              className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              type="button"
              onClick={showNextComments}
            >
              View {` `}
              {commentsCount} more {` `}
              {commentsCount === 1 ? 'comment' : 'comments'}
            </button>
          )}
        {commentsSlice >= comments.length &&
          commentsSlice > MORE_COMMENTS_COUNT && (
            <button
              className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              type="button"
              onClick={hideComments}
            >
              Hide comments
            </button>
          )}
        {renderPreviewComments()}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        handleSetComments={handleSetComments}
        commentInput={commentInput}
      />
    </>
  );
};

Comments.propTypes = {
  docId: pt.string.isRequired,
  comments: pt.array.isRequired,
  posted: pt.number.isRequired,
  commentInput: pt.object.isRequired,
};

export default Comments;
