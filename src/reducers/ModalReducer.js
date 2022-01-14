let ModalReducer = (state = { showModal: false, modalInfo: null }, action) => {
  switch (action.type) {
    case "SHOW_CONFIRM_MODAL":
      return { showModal: true, modalInfo: action.payload };
      break;
    case "SHOW_COMPONENT_MODAL":
      return { showModal: true, modalComponent: action.payload };
    case "HIDE_MODAL":
      return { showModal: false };
      break;
    default:
      return state;
      break;
  }
};

export default ModalReducer;
