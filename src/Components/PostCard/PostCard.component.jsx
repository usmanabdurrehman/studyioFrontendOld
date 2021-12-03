import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styles from "./PostCard.module.scss";

import { Button, Comment } from "Components";

import { FileIcon, defaultStyles } from "react-file-icon";
import Popover from "@material-ui/core/Popover";

import { classNames, getProfileImageURL, getFileURL } from "utils";
export default function PostCard({
  post,
  likePost,
  unlikePost,
  commentOnPost,
  commentOnChange,
  comment,
  toggleShowMore,
  showMore,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const editPost = () => {};

  const deletePost = () => {};

  return (
    <div className={styles.postCard}>
      <div className={styles.cardHeader}>
        <img
          className={styles.profilePicture}
          src={getProfileImageURL(post?.user?.profileImage)}
        />
        <p className={styles.nameHandle}>
          <Link to={`/profile/${post.userId}`}>{post?.user?.name}</Link>
        </p>
        <IconButton className={styles.moreIcon} onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div
        className={styles.cardBody}
        dangerouslySetInnerHTML={{ __html: post.postText }}
      ></div>
      {post.files && (
        <div className={styles.fileContainer}>
          {post.files.map((file) => {
            const splittedFilename = file.filename.split(".");
            const ext = splittedFilename[splittedFilename.length - 1];
            return (
              <a
                href={getFileURL(file.filename)}
                download={file.originalFilename} // download does not work for cross origin servers
              >
                <div className={styles.fileCard}>
                  <div className={styles.fileCardIcon}>
                    <FileIcon extension={ext} {...defaultStyles[ext]} />
                  </div>
                  <div className={styles.fileName}>{file.originalFilename}</div>
                </div>
              </a>
            );
          })}
        </div>
      )}
      {post.images && (
        <div className={styles.postImagesWrapper}>
          {post.images.map((image) => (
            <div>
              <img src={getFileURL(image)} />
            </div>
          ))}
        </div>
      )}
      <form className={styles.postCardFooter} onSubmit={commentOnPost}>
        <div className={styles.likeWrapper}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => {
              if (post.liked == true) {
                unlikePost();
              } else {
                likePost();
              }
            }}
            aria-label="open drawer"
          >
            <ThumbUpAltIcon
              className={classNames({
                [styles.likeIcon]: true,
                [styles.liked]: post.liked,
              })}
            />
          </IconButton>
          {post.likes.length != 0 && (
            <p className={styles.likesCount}>{post.likes.length}</p>
          )}
        </div>
        <div className={styles.commentWrapper}>
          <input
            className={styles.commentInput}
            onChange={commentOnChange}
            value={comment}
            placeholder="Comment..."
          />
          {post.comments &&
            (showMore
              ? post.comments.map((comment) => <Comment comment={comment} />)
              : post.comments
                  .slice(0, 2)
                  .map((comment) => <Comment comment={comment} />))}
          {post.comments.length > 2 && (
            <p className={styles.moreText} onClick={toggleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </p>
          )}
        </div>
        <div>
          <Button classes={{ button: styles.addCommentButton }} type="submit">
            Comment
          </Button>
        </div>
      </form>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={styles.postOptions}>
          <div className={styles.postOption} onClick={editPost}>
            Edit
          </div>
          <div className={styles.postOption} onClick={deletePost}>
            Delete
          </div>
        </div>
      </Popover>
    </div>
  );
}
