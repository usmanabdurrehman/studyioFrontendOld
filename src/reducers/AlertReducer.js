/* eslint default-param-last: 0 */
const AlertReducer = (state = { showAlert: false, alertInfo: null }, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return { showAlert: true, alertInfo: action.payload };
    case 'HIDE_ALERT':
      return { showAlert: false };
    default:
      return state;
  }
};

export default AlertReducer;
