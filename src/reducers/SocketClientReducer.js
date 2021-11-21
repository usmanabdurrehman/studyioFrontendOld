import socketClient from "socket.io-client";
const socket = socketClient("http://localhost:7000/");

let SocketClientReducer = (state = socket, action) => {
  switch (action.type) {
    default:
      return state;
      break;
  }
};

export default SocketClientReducer;
