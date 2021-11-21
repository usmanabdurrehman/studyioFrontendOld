let AlertReducer = (state = { showAlert: false, text: null }, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return { showAlert: true, text: action.payload };
      break;
    case "HIDE_ALERT":
      return { showAlert: false };
      break;
    default:
      return state;
      break;
  }
};

export default AlertReducer;
