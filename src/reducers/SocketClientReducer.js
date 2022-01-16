/* eslint default-param-last: 0 */
const SocketClientReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export default SocketClientReducer;
