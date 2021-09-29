import React, { useState, useContext } from 'react';
import pt from 'prop-types';
import { updatePostComments } from '../../services/firebase';
import { UserContext } from '../../context';

const AddComment = ({ docId, handleSetComments, commentInput }) => {
  const [comment, setComment] = useState('');
  const {
    user: { username },
  } = useContext(UserContext);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!comment.length) return;

    const commentData = {
      displayName: username,
      comment,
      createdDate: Date.now(),
    };

    handleSetComments(commentData);
    setComment('');

    return await updatePostComments(docId, commentData);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.propTypes = {
  docId: pt.string.isRequired,
  handleSetComments: pt.func.isRequired,
  commentInput: pt.object,
};

export default AddComment;
