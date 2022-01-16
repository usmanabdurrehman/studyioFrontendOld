import React, {
  useState, useEffect, useCallback, memo,
} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  getProfileInfo,
  follow,
  unfollow,
  updateProfilePicture,
} from 'queries';

import { Profile } from 'Components';

const ProfileContainer = memo(({ id }) => {
  const [profileInfo, setProfileInfo] = useState({
    user: null,
    posts: null,
  });

  const { _id: userId } = useSelector((state) => state.user);

  const [fields, setFields] = useState({
    image: '',
    imgUrl: '',
  });

  const imageOnChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        setFields((prevFields) => ({
          ...prevFields,
          image: e.target.files[0],
          imgUrl,
        }));
      }
    },
    [setFields],
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
  }, [setProfileInfo, id]);

  const followHandler = useCallback(async () => {
    const { status } = await follow(id);
    status
      && setProfileInfo((prevProfileInfo) => ({
        ...prevProfileInfo,
        user: { ...prevProfileInfo.user, isFollowing: true },
      }));
  }, [id, setProfileInfo]);

  const unfollowHandler = useCallback(async () => {
    const { status } = await unfollow(id);
    status
      && setProfileInfo((prevProfileInfo) => ({
        ...prevProfileInfo,
        user: { ...prevProfileInfo.user, isFollowing: false },
      }));
  }, [id, setProfileInfo]);

  const updateProfilePictureHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('image', fields.image);
      const { status, user } = await updateProfilePicture(formdata);
      if (status) {
        dispatch({ type: 'SET_USER', payload: user });
        setProfileInfo((prevProfileInfo) => ({ ...prevProfileInfo, user }));
      }
    },
    [dispatch, setProfileInfo, fields.image],
  );

  useEffect(() => {
    fetchProfileInfo();
  }, [fetchProfileInfo, id]);

  return (
    <Profile
      profileInfo={profileInfo}
      updateProfile={updateProfilePictureHandler}
      follow={followHandler}
      unfollow={unfollowHandler}
      imageOnChange={imageOnChange}
      openModal={openModal}
      closeModal={closeModal}
      modalIsOpen={modalIsOpen}
      fields={fields}
      userId={userId}
      id={id}
      fetchProfileInfo={fetchProfileInfo}
    />
  );
});

export default ProfileContainer;
