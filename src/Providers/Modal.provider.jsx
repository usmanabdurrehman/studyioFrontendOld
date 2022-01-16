import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal } from 'Components';

export default function ModalProvider({ children }) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch({ type: 'HIDE_MODAL' });
  return (
    <div>
      <Modal modal={modal} closeModal={closeModal} />
      {children}
    </div>
  );
}
