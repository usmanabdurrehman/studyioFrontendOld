import React from "react";
import styles from "./AddPostCard.module.scss";
import AttachmentIcon from "@material-ui/icons/Attachment";

import { Button } from "../";

import { Editor } from "@tinymce/tinymce-react";

import { FileIcon, defaultStyles } from "react-file-icon";

import ImageIcon from "@material-ui/icons/Image";

const AddPostCard = ({
  edit,
  addPost,
  editPost,
  post,
  files,
  images,
  onFileChange,
  onTextChange,
  onImageChange,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>{edit != true ? "New Post" : "Edit Post"}</div>
        <div className={styles.iconsWrapper}>
          <div className={styles.profileImageWrapper}>
            <div className={styles.fileWrapper}>
              <input
                type="file"
                id={styles.image}
                onChange={onImageChange}
                multiple={true}
                accept=".jpg,.png"
              />
              <label for={styles.image}>
                <ImageIcon className={styles.icon} />
              </label>
            </div>
          </div>
          <div className={styles.profileImageWrapper}>
            <div className={styles.fileWrapper}>
              <input
                type="file"
                id={styles.attach}
                onChange={onFileChange}
                multiple={true}
              />
              <label for={styles.attach}>
                <AttachmentIcon className={styles.icon} />
              </label>
            </div>
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
          {images && (
            <div className={styles.postImagesWrapper}>
              {images.map((image) => (
                <div>
                  <img src={URL.createObjectURL(image)} />
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
