import React, { useRef, useEffect, memo } from 'react';

import { PostCard } from 'Containers';

import { FAB, Button, PostCardSkeleton } from 'Components';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import Modal from 'react-modal';

import { getProfileImageURL } from 'utils';

import Skeleton from 'react-loading-skeleton';
import styles from './Profile.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const Profile = memo(({
  profileInfo,
  follow,
  unfollow,
  updateProfile,
  imageOnChange,
  openModal,
  closeModal,
  modalIsOpen,
  fields,
  userId,
  id,
  fetchProfileInfo,
}) => {
  const profileWrapperRef = useRef();

  useEffect(() => {
    if (profileWrapperRef.current) {
      profileWrapperRef.current.scrollTo({
        top: 0,
      });
    }
  }, [profileWrapperRef]);

  const getProfileURL = () => {
    if (fields.imgUrl) {
      return fields.imageUrl;
    }
    if (profileInfo?.user?.profileImage) {
      return getProfileImageURL(profileInfo?.user?.profileImage);
    } return '/defaultProfile.png';
  };

  return (
    <div>
      <div className={styles.profileWrapper} ref={profileWrapperRef}>
        <div className={styles.profile}>
          <div className={styles.profileImageWrapper}>
            {profileInfo?.user?.profileImage ? (
              <img
                src={getProfileImageURL(profileInfo?.user?.profileImage)}
                className={styles.profilePic}
                alt="Profile"
              />
            ) : (
              <Skeleton height={150} width={150} />
            )}
            <div
              className={styles.cameraIconWrapper}
              onClick={openModal}
              onKeyPress={openModal}
              role="button"
              tabIndex="-1"
            >
              <CameraAltIcon className={styles.cameraIcon} />
            </div>
          </div>
          <div className={styles.profileStats}>
            <h2>{profileInfo?.user?.name}</h2>
            <div className={styles.profileStatsGrid}>
              <div className={styles.profileStatsCount}>
                {profileInfo?.user?.followers.length}
              </div>
              <div className={styles.profileStatsCount}>
                {profileInfo?.user?.following.length}
              </div>
              <div className={styles.profileStatsHeader}>Followers</div>
              <div className={styles.profileStatsHeader}>Following</div>
            </div>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h2>Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            perferendis molestiae dicta possimus nostrum earum, unde ex. Tempora
            praesentium unde sed neque illo culpa, libero ipsa sint officia
            maiores commodi!
          </p>
        </div>
      </div>

      <div className={styles.posts}>
        <div>
          {profileInfo?.posts ? (
            profileInfo?.posts?.length > 0
            && profileInfo?.posts.map((post) => (
              <PostCard
                post={post}
                page="profile"
                fetchFunction={fetchProfileInfo}
              />
            ))
          ) : (
            <PostCardSkeleton />
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className={styles.Modal}
          overlayClassName={styles.Overlay}
        >
          <h2>Update Profile Picture</h2>
          <form onSubmit={updateProfile} className={styles.profileForm}>
            <div className={styles.profileImageWrapper}>
              <div className={styles.fileWrapper}>
                <label htmlFor={styles.image}>
                  <input
                    type="file"
                    id={styles.image}
                    onChange={imageOnChange}
                  />
                  <img src={getProfileURL()} alt="Profile" />
                </label>
              </div>
            </div>
            <Button color="success" variant="filled" type="submit">
              Save
            </Button>
          </form>
        </Modal>
        {userId !== id && profileInfo?.user && (
          <div className={styles.fabWrapper}>
            <FAB
              variant="filled"
              onClick={profileInfo?.user.isFollowing ? unfollow : follow}
            >
              {profileInfo?.user.isFollowing ? (
                <PersonAddDisabledIcon />
              ) : (
                <PersonAddIcon />
              )}
            </FAB>
          </div>
        )}
      </div>
    </div>
  );
});

export default Profile;
