import React, { useState } from "react";
import { AddPostCard } from "Components";

import axios from "axios";
import { addPost } from "queries";

export default function AddPostCardContainer({
  edit,
  postContent,
  fetchFunction,
  postId,
}) {
  const [post, setPost] = useState(edit != true ? "" : postContent);
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);

  const addPostHandler = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("post", post);
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
    console.log("formdata", formdata);

    const { status } = await addPost(formdata);
    if (status) {
      setPost("");
      setFiles(null);
      setImages(null);
      fetchFunction();
    }
  };

  const editPostHandler = (e) => {
    e.preventDefault();
    axios({
      url: "/user/posts",
      method: "put",
      data: { post, postId },
      withCredentials: true,
    }).then(() => {
      fetchFunction();
    });
  };

  const onFileChange = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setFiles([...e.target.files]);
    }
  };

  const onImageChange = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setImages([...e.target.files]);
    }
  };

  console.log(files, images);

  const onTextChange = (newValue, editor) => setPost(newValue);
  return (
    <AddPostCard
      edit={edit}
      addPost={addPostHandler}
      editPost={editPostHandler}
      post={post}
      files={files}
      images={images}
      onFileChange={onFileChange}
      onImageChange={onImageChange}
      onTextChange={onTextChange}
    />
  );
}
