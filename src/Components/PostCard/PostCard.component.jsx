import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Button, Comment } from 'Components';

import { FileIcon, defaultStyles } from 'react-file-icon';
import Popover from '@material-ui/core/Popover';

import { classNames, getProfileImageURL, getFileURL } from 'utils';
import { useSelector } from 'react-redux';
import styles from './PostCard.module.scss';

const PostCard = memo(({
  post,
  likePost,
  unlikePost,
  commentOnPost,
  commentOnChange,
  comment,
  toggleShowMore,
  showMore,
  deletePost,
  editPost,
  hidePost,
  unhidePost,
}) => {
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={styles.postCard}>
      <div className={styles.cardHeader}>
        <img
          className={styles.profilePicture}
          src={getProfileImageURL(post?.user?.profileImage)}
          alt="Profile"
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
        dangerouslySetInnerHTML={{
          __html: post.postText,
        }} /* eslint react/no-danger: 0 */
      />
      {post.files && (
        <div className={styles.fileContainer}>
          {post.files.map((file) => {
            const splittedFilename = file.filename.split('.');
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
              <img src={getFileURL(image)} alt="File" />
            </div>
          ))}
        </div>
      )}
      <form className={styles.postCardFooter} onSubmit={commentOnPost}>
        <div className={styles.likeWrapper}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              if (post.liked === true) {
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
          {post.likes.length !== 0 && (
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
          {post.comments
            && (showMore
              ? post.comments.map((postComment) => (
                <Comment comment={postComment} />
              ))
              : post.comments
                .slice(0, 2)
                .map((postComment) => <Comment comment={postComment} />))}
          {post.comments.length > 2 && (
            <div
              onClick={toggleShowMore}
              onKeyPress={toggleShowMore}
              role="button"
              tabIndex="-1"
            >
              <p className={styles.moreText}>
                {showMore ? 'Show Less' : 'Show More'}
              </p>
            </div>
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={styles.postOptions}>
          {user._id === post.userId && (
            <>
              <div
                className={styles.postOption}
                onClick={() => {
                  handleClose();
                  editPost(post._id);
                }}
                onKeyPress={() => {
                  handleClose();
                  editPost(post._id);
                }}
                role="button"
                tabIndex="-1"
              >
                Edit
              </div>
              <div
                className={styles.postOption}
                onClick={() => {
                  handleClose();
                  deletePost(post._id);
                }}
                onKeyPress={() => {
                  handleClose();
                  deletePost(post._id);
                }}
                role="button"
                tabIndex="-1"
              >
                Delete
              </div>
            </>
          )}
          {user._id !== post.userId && (
            <div
              className={styles.postOption}
              onClick={() => {
                handleClose();
                post?.hidden ? unhidePost(post._id) : hidePost(post._id);
              }}
              onKeyPress={() => {
                handleClose();
                post?.hidden ? unhidePost(post._id) : hidePost(post._id);
              }}
              role="button"
              tabIndex="-1"
            >
              {post?.hidden ? 'Unhide' : 'Hide'}
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
});

export default PostCard;
