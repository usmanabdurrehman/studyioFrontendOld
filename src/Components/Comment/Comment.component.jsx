import React from "react";
import styles from "./Comment.module.scss";

export default function Comment({ comment }) {
  return (
    <div className={styles.commentWrapper}>
      <div>
        <img
          src={`${process.env.REACT_APP_BACKEND_BASEURL}/profileImages/${comment?.commenter?.profileImage}`}
          className={styles.commentProfilePicture}
        />
      </div>
      <div className={styles.name}>{comment.commenter.name}</div>
      <div className={styles.comment}>{comment.comment}</div>
    </div>
  );
}
