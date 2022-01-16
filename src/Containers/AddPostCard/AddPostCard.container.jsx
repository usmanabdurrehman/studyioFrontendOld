import React, { useState, useCallback, memo } from 'react';
import { AddPostCard } from 'Components';

import { addPost, editPost } from 'queries';
import { useDispatch } from 'react-redux';

const AddPostCardContainer = memo(({ post, fetchFunction }) => {
  const [postText, setPostText] = useState(post ? post.postText : '');
  const [files, setFiles] = useState(post?.files);
  const [images, setImages] = useState(post?.images);

  const dispatch = useDispatch();

  const addPostHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append('post', postText);
      if (files) {
        files.forEach((file) => {
          formdata.append('attachments', file, file.name);
        });
      }
      if (images) {
        images.forEach((image) => {
          formdata.append('images', image, image.name);
        });
      }

      const { status } = await addPost(formdata);
      if (status) {
        setPostText('');
        setFiles(null);
        setImages(null);
        fetchFunction();
      }
    },
    [
      postText,
      files,
      images,
      fetchFunction,
      setFiles,
      setImages,
      setPostText,
    ],
  );

  const editPostHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append('postId', post._id);
      formdata.append('post', postText);
      const oldFiles = files.filter((file) => !!file?.filename);
      const newFiles = files.filter((file) => !file?.filename);

      formdata.append('oldAttachments', JSON.stringify(oldFiles));
      if (newFiles.length) {
        newFiles.forEach((file) => {
          formdata.append('attachments', file, file.name);
        });
      }

      const oldImages = images.filter((image) => !image?.name);
      const newImages = images.filter((image) => !!image?.name);

      formdata.append('oldImages', JSON.stringify(oldImages));
      if (newImages.length) {
        newImages.forEach((image) => {
          formdata.append('images', image, image.name);
        });
      }

      const { status } = await editPost(formdata);
      if (status) {
        setPostText('');
        setFiles(null);
        setImages(null);
        fetchFunction();
        dispatch({ type: 'HIDE_MODAL' });
      }
    },
    [
      dispatch,
      post,
      postText,
      files,
      images,
      fetchFunction,
      setFiles,
      setImages,
      setPostText,
    ],
  );

  const onFileChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        setFiles((prevFiles) => [...(prevFiles || []), ...e.target.files]);
      }
    },
    [setFiles],
  );

  const onImageChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        setImages((prevImages) => [...(prevImages || []), ...e.target.files]);
      }
    },
    [setImages],
  );

  const onCloseImageClick = useCallback(
    (name) => {
      setImages((prevImages) => prevImages.filter((image) => (image?.name || image) !== name));
    },
    [setImages],
  );

  const onCloseFileClick = useCallback(
    (name) => {
      setFiles((prevFiles) => prevFiles.filter((file) => (file?.name || file?.filename) !== name));
    },
    [setFiles],
  );

  const onTextChange = useCallback(
    (newValue) => setPostText(newValue),
    [setPostText],
  );

  return (
    <AddPostCard
      post={post}
      addPost={addPostHandler}
      editPost={editPostHandler}
      postText={postText}
      files={files}
      images={images}
      onFileChange={onFileChange}
      onImageChange={onImageChange}
      onTextChange={onTextChange}
      onCloseImageClick={onCloseImageClick}
      onCloseFileClick={onCloseFileClick}
    />
  );
});

export default AddPostCardContainer;
