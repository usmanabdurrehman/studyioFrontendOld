import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { PostCard } from "Containers";

import { FAB, Button, PostCardSkeleton } from "Components";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import { useSelector, useDispatch } from "react-redux";

import { Layout } from "Layouts";

import Modal from "react-modal";

import {
  getProfileInfo,
  follow,
  unfollow,
  updateProfilePicture,
} from "queries";

import { getProfileImageURL } from "utils";

const Profile = (props) => {
  const [profileInfo, setProfileInfo] = useState({
    user: null,
    posts: null,
  });

  const { _id } = useSelector((state) => state.user);
  const id = props.match.params.id;

  const [isLoading, setIsLoading] = useState(null);

  const [fields, setFields] = useState({
    image: "",
    imgUrl: "",
  });

  const imageOnChange = (e) => {
    if (e.target.files[0]) {
      let imgUrl = URL.createObjectURL(e.target.files[0]);
      setFields({ ...fields, image: e.target.files[0], imgUrl });
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();

  const fetchProfileInfo = async () => {
    console.log("this ran");
    const data = await getProfileInfo(id);
    setProfileInfo(data);
    setIsLoading(false);
  };

  const followHandler = async () => {
    const { status } = await follow(id);
    status &&
      setProfileInfo({
        ...profileInfo,
        user: { ...profileInfo.user, isFollowing: true },
      });
  };

  const unfollowHandler = async () => {
    const { status } = await unfollow(id);
    status &&
      setProfileInfo({
        ...profileInfo,
        user: { ...profileInfo.user, isFollowing: false },
      });
  };

  const updateProfilePictureHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", fields.image);
    const { status, user } = await updateProfilePicture(formdata);
    if (status) {
      dispatch({ type: "SET_USER", payload: user });
      setProfileInfo({ ...profileInfo, user: user });
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, [id]);
  console.log("profileInfo", profileInfo);

  return (
    <Layout useGutter={false}>
      <div className={styles.profileWrapper}>
        <div className={styles.profile}>
          <div className={styles.profileImageWrapper}>
            <img
              src={getProfileImageURL(profileInfo?.user?.profileImage)}
              className={styles.profilePic}
            />
            <div className={styles.cameraIconWrapper} onClick={openModal}>
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
            profileInfo?.posts?.length > 0 &&
            profileInfo?.posts.map((post) => (
              <PostCard
                post={post}
                page={"profile"}
                fetchFunction={fetchProfileInfo}
              />
            ))
          ) : (
            <PostCardSkeleton />
          )}
        </div>
      </div>
      {_id != props.match.params.id && profileInfo?.user && (
        <div className={styles.fabWrapper}>
          <FAB
            variant="filled"
            onClick={
              profileInfo?.user.isFollowing ? unfollowHandler : followHandler
            }
          >
            {profileInfo?.user.isFollowing ? (
              <PersonAddDisabledIcon />
            ) : (
              <PersonAddIcon />
            )}
          </FAB>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <h2>Update Profile Picture</h2>
        <form
          onSubmit={updateProfilePictureHandler}
          className={styles.profileForm}
        >
          <div className={styles.profileImageWrapper}>
            <div className={styles.fileWrapper}>
              <input type="file" id={styles.image} onChange={imageOnChange} />
              <label for={styles.image}>
                <img
                  src={
                    fields.imgUrl
                      ? fields.imgUrl
                      : profileInfo?.user?.profileImage
                      ? getProfileImageURL(profileInfo?.user?.profileImage)
                      : "/defaultProfile.png"
                  }
                />
              </label>
            </div>
          </div>
          <Button color="success" variant="filled" type="submit">
            Save
          </Button>
        </form>
      </Modal>
    </Layout>
  );
};

export default Profile;
