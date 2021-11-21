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

  const addPostHandler = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("post", post);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("files", files[i], files[i].name);
      }
    }

    const { status } = await addPost(formdata);
    if (status) {
      setPost("");
      setFiles(null);
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
    if (e.target.files[0]) {
      setFiles([...e.target.files]);
    }
  };

  const onTextChange = (newValue, editor) => setPost(newValue);
  return (
    <AddPostCard
      edit={edit}
      addPost={addPostHandler}
      editPost={editPostHandler}
      post={post}
      files={files}
      onFileChange={onFileChange}
      onTextChange={onTextChange}
    />
  );
}
