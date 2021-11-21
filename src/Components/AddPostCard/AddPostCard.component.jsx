import React, { useState } from "react";
import axios from "axios";
import styles from "./AddPostCard.module.scss";
import AttachmentIcon from "@material-ui/icons/Attachment";

import { Button } from "../";

import { Editor } from "@tinymce/tinymce-react";

import { FileIcon, defaultStyles } from "react-file-icon";

import { addPost } from "queries";

const AddPostCard = ({
  edit,
  addPost,
  editPost,
  post,
  files,
  onFileChange,
  onTextChange,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>{edit != true ? "New Post" : "Edit Post"}</div>
        <div className={styles.profileImageWrapper}>
          <div className={styles.fileWrapper}>
            <input
              type="file"
              id={styles.image}
              onChange={onFileChange}
              multiple={true}
            />
            <label for={styles.image}>
              <AttachmentIcon className={styles.attachIcon} />
            </label>
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <form onSubmit={edit != true ? addPost : editPost}>
          <div>
            <Editor
              className={styles.textarea}
              apiKey="mr7s25j95m3vnm6e6bty7baeo74sc83zmll44tbxcpl959ou"
              init={{
                plugins: "emoticons",
                toolbar: "emoticons",
                toolbar_location: "bottom",
                menubar: false,
                resize: false,
              }}
              value={post}
              onEditorChange={onTextChange}
            />
          </div>
          {files && (
            <div className={styles.fileContainer}>
              {files.map((file) => (
                <div className={styles.fileIcon}>
                  <FileIcon
                    extension={file.type.split("/")[1]}
                    {...defaultStyles[file.type.split("/")[1]]}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={styles.addButtonWrapper}>
            <Button
              type="submit"
              color="primary"
              variant="filled"
              classes={{ button: styles.addButton }}
            >
              {edit != true ? "Add Post" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostCard;
