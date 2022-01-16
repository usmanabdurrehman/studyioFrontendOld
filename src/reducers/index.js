import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AlertReducer from './AlertReducer';
import SocketClientReducer from './SocketClientReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
  user: UserReducer,
  alert: AlertReducer,
  socket: SocketClientReducer,
  modal: ModalReducer,
});
