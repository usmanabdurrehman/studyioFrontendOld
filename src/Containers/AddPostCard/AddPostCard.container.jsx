import React, { useState, useCallback } from "react";
import { AddPostCard } from "Components";

import { addPost, editPost } from "queries";
import { useDispatch } from "react-redux";

export default function AddPostCardContainer({ post, fetchFunction }) {
  const [postText, setPostText] = useState(post ? post.postText : "");
  const [files, setFiles] = useState(post?.files);
  const [images, setImages] = useState(post?.images);

  const dispatch = useDispatch();

  const addPostHandler = useCallback(
    async (e) => {
      e.preventDefault();

      let formdata = new FormData();
      formdata.append("post", postText);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formdata.append("attachments", files[i], files[i].name);
        }
      }
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formdata.append("images", images[i], images[i].name);
        }
      }

      const { status } = await addPost(formdata);
      if (status) {
        setPostText("");
        setFiles(null);
        setImages(null);
        fetchFunction();
      }
    },
    [
      post,
      postText,
      files,
      images,
      fetchFunction,
      setFiles,
      setImages,
      setPostText,
    ]
  );

  const editPostHandler = useCallback(
    async (e) => {
      e.preventDefault();

      let formdata = new FormData();
      formdata.append("postId", post._id);
      formdata.append("post", postText);
      const oldFiles = files.filter((file) => !!file?.filename);
      const newFiles = files.filter((file) => !file?.filename);

      formdata.append("oldAttachments", JSON.stringify(oldFiles));
      if (newFiles.length) {
        for (let i = 0; i < newFiles.length; i++) {
          formdata.append("attachments", newFiles[i], newFiles[i].name);
        }
      }

      const oldImages = images.filter((image) => !image?.name);
      const newImages = images.filter((image) => !!image?.name);

      formdata.append("oldImages", JSON.stringify(oldImages));
      if (newImages.length) {
        for (let i = 0; i < newImages.length; i++) {
          formdata.append("images", newImages[i], newImages[i].name);
        }
      }

      const { status } = await editPost(formdata);
      if (status) {
        setPostText("");
        setFiles(null);
        setImages(null);
        fetchFunction();
        dispatch({ type: "HIDE_MODAL" });
      }
    },
    [
      post,
      postText,
      files,
      images,
      fetchFunction,
      setFiles,
      setImages,
      setPostText,
    ]
  );

  const onFileChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        setFiles((files) => [...(files || []), ...e.target.files]);
      }
    },
    [setFiles]
  );

  const onImageChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        console.log([...e.target.files]);
        setImages((images) => [...(images || []), ...e.target.files]);
      }
    },
    [setImages]
  );

  const onCloseImageClick = useCallback(
    (name) => {
      console.log("yooo", name, images);
      setImages((images) =>
        images.filter((image) => (image?.name || image) != name)
      );
    },
    [setImages]
  );

  const onCloseFileClick = useCallback(
    (name) => {
      setFiles((files) =>
        files.filter((file) => (file?.name || file?.filename) != name)
      );
    },
    [setFiles]
  );

  const onTextChange = useCallback(
    (newValue) => setPostText(newValue),
    [setPostText]
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
}
