import React from "react";
import styles from "./AddPostCard.module.scss";
import AttachmentIcon from "@material-ui/icons/Attachment";

import { Button } from "../";

import { Editor } from "@tinymce/tinymce-react";

import { FileIcon, defaultStyles } from "react-file-icon";

import ImageIcon from "@material-ui/icons/Image";

import { getFileURL } from "utils";

import CancelIcon from "@material-ui/icons/Cancel";

const AddPostCard = ({
  post,
  postText,
  addPost,
  editPost,
  files,
  images,
  onFileChange,
  onTextChange,
  onImageChange,
  onCloseImageClick,
  onCloseFileClick,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>{post ? "Edit Post" : "New Post"}</div>
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
        <form onSubmit={post ? editPost : addPost}>
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
              value={postText}
              onEditorChange={onTextChange}
            />
          </div>
          {files && (
            <div className={styles.fileContainer}>
              {files.map((file) => {
                const isUploadedFile = file?.filename;
                const extensionArr = (
                  isUploadedFile ? file?.filename : file.type
                ).split(isUploadedFile ? "." : "/");
                const extension = extensionArr[extensionArr.length - 1];
                return (
                  <div className={styles.fileIcon}>
                    <FileIcon
                      extension={extension}
                      {...defaultStyles[extension]}
                    />
                    <CancelIcon
                      className={styles.removeFileIcon}
                      onClick={() =>
                        onCloseFileClick(file?.name || file?.filename)
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
          {images && (
            <div className={styles.postImagesWrapper}>
              {images.map((image) => (
                <div className={styles.imageWrapper}>
                  <img
                    src={
                      typeof image == "string"
                        ? getFileURL(image)
                        : URL.createObjectURL(image)
                    }
                  />
                  <CancelIcon
                    className={styles.removeIcon}
                    onClick={() => onCloseImageClick(image?.name || image)}
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
              {post ? "Update" : "Add Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostCard;
