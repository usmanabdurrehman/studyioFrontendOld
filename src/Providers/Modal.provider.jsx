import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal } from 'Components';

const ModalProvider = memo(({ children }) => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch({ type: 'HIDE_MODAL' });
  return (
    <div>
      <Modal modal={modal} closeModal={closeModal} />
      {children}
    </div>
  );
});

export default ModalProvider;
