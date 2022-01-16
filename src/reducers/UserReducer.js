/* eslint-disable */
const UserReducer = (state = JSON.parse(localStorage.getItem('user')) ?? null, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload;
    case 'LOGOUT':
      localStorage.removeItem('user');
      return null;
    default:
      return state;
  }
}

export default UserReducer;
