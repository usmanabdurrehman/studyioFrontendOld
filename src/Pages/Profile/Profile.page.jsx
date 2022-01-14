import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = (props) => {
  const [profileInfo, setProfileInfo] = useState({
    user: null,
    posts: null,
  });

  const profileWrapperRef = useRef();

  const { _id } = useSelector((state) => state.user);
  const id = useMemo(() => props.match.params.id, [props.match]);

  const [isLoading, setIsLoading] = useState(null);

  const [fields, setFields] = useState({
    image: "",
    imgUrl: "",
  });

  const imageOnChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        let imgUrl = URL.createObjectURL(e.target.files[0]);
        setFields({ ...fields, image: e.target.files[0], imgUrl });
      }
    },
    [setFields]
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const dispatch = useDispatch();

  const fetchProfileInfo = useCallback(async () => {
    const data = await getProfileInfo(id);
    setProfileInfo(data);
    setIsLoading(false);
  }, [getProfileInfo, setProfileInfo, setIsLoading]);

  const followHandler = useCallback(async () => {
    const { status } = await follow(id);
    status &&
      setProfileInfo({
        ...profileInfo,
        user: { ...profileInfo.user, isFollowing: true },
      });
  }, [follow, setProfileInfo]);

  const unfollowHandler = useCallback(async () => {
    const { status } = await unfollow(id);
    status &&
      setProfileInfo({
        ...profileInfo,
        user: { ...profileInfo.user, isFollowing: false },
      });
  }, [unfollow, setProfileInfo]);

  const updateProfilePictureHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("image", fields.image);
      const { status, user } = await updateProfilePicture(formdata);
      if (status) {
        dispatch({ type: "SET_USER", payload: user });
        setProfileInfo({ ...profileInfo, user: user });
      }
    },
    [updateProfilePicture, dispatch, setProfileInfo]
  );

  useEffect(() => {
    fetchProfileInfo();
    if (profileWrapperRef.current) {
      profileWrapperRef.current.scrollTo({
        top: 0,
      });
    }
  }, [fetchProfileInfo, id, profileWrapperRef]);

  return (
    <Layout useGutter={false}>
      <div className={styles.profileWrapper} ref={profileWrapperRef}>
        <div className={styles.profile}>
          <div className={styles.profileImageWrapper}>
            {profileInfo?.user?.profileImage ? (
              <img
                src={getProfileImageURL(profileInfo?.user?.profileImage)}
                className={styles.profilePic}
              />
            ) : (
              <Skeleton height={150} width={150} />
            )}
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
