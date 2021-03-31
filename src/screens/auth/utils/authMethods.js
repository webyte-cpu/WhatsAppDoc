import ACTIONS from './actions';
import Users from './dummyDataUsers';
import { removeData, storeData } from './handleData';

const getUser = (users, email, password) =>
  users.find((user) => email === user.email && password === user.password);

const loginUser = async (dispatch, email, password, errCallback) => {
  // AWAIT verify userData: send to server => hash password => find match in db => generate token (remove password) => return token
  const token = getUser(Users, email, password); // JWT token
  if (token == null) {
    return errCallback('Email or password is incorrect.');
  } else {
    await storeData('token', token);
    dispatch({ type: ACTIONS.LOGIN, payload: { token } });
  }
};

const logoutUser = async (dispatch) => {
  await removeData('token');
  dispatch({ type: ACTIONS.LOGOUT });
};

const signupUser = async (dispatch, userData) => {
  // AWAIT add user to db => login user
  Users.push(userData);
  // console.log(Users);
  const { email, password } = userData;
  // const token = await response.json()
  await loginUser(dispatch, email, password);
};

export { loginUser, logoutUser, signupUser };
