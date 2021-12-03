let SocketClientReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return action.payload;
    default:
      return state;
      break;
  }
};

export default SocketClientReducer;
