/* eslint default-param-last: 0 */
const ModalReducer = (state = { showModal: false, modalInfo: null }, action) => {
  switch (action.type) {
    case 'SHOW_CONFIRM_MODAL':
      return { showModal: true, modalInfo: action.payload };
    case 'SHOW_COMPONENT_MODAL':
      return { showModal: true, modalComponent: action.payload };
    case 'HIDE_MODAL':
      return { showModal: false };
    default:
      return state;
  }
};

export default ModalReducer;
