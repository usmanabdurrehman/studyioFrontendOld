import React from "react";
import ReactModal from "react-modal";

import { Button } from "Components";

import styles from "./Modal.module.css";

import { classNames } from "utils";

export default function Modal({ modal, closeModal }) {
  const { text, buttons, onConfirm } = modal?.modalInfo || {};

  return (
    <ReactModal
      isOpen={
        !!(modal?.showModal && (modal?.modalInfo || modal?.modalComponent))
      }
      className={classNames({
        [styles.modal]: true,
        [styles.componentModel]: modal?.modalComponent,
      })}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      {modal?.modalComponent ? (
        modal?.modalComponent
      ) : (
        <>
          <h4 className={styles.header}>{text}</h4>
          {buttons && (
            <div className={styles.buttonWrapper}>
              {buttons.map(({ color, text, confirm }) => (
                <Button
                  variant="filled"
                  color={color}
                  onClick={() => {
                    if (confirm) {
                      onConfirm();
                      closeModal();
                    } else {
                      closeModal();
                    }
                  }}
                  classes={{ button: styles.button }}
                >
                  {text}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </ReactModal>
  );
}
