import UserReducer from "./UserReducer";
import AlertReducer from "./AlertReducer";
import SocketClientReducer from "./SocketClientReducer";
import ModalReducer from "./ModalReducer";

import { combineReducers } from "redux";

export default combineReducers({
  user: UserReducer,
  alert: AlertReducer,
  socket: SocketClientReducer,
  modal: ModalReducer,
});
