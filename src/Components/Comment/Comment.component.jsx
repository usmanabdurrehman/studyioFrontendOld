import React, { memo } from 'react';
import styles from './Comment.module.scss';

const Comment = memo(({ comment }) => (
  <div className={styles.commentWrapper}>
    <div>
      <img
        src={comment?.commenter?.profileImage}
        className={styles.commentProfilePicture}
        alt="Profile"
      />
    </div>
    <div className={styles.name}>{comment.commenter.name}</div>
    <div className={styles.comment}>{comment.comment}</div>
  </div>
));

export default Comment;
