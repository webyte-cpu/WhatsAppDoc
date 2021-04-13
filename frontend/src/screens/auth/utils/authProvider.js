import React, {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { getData } from './handleData';
import { loginUser, logoutUser, signupUser } from './authMethods';
import ACTIONS from './actions';

const initialState = {
  isLoading: true,
  token: null,
  errMsg: ''
};

const reducer = (initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...initialState,
        token: action.payload.token,
        errMsg: null
      };
    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        token: null,
        errMsg: null
      };
    case ACTIONS.RETRIEVE:
      return {
        ...initialState,
        token: action.payload.token,
        isLoading: false,
        errMsg: null
      };
    case ACTIONS.ERR_MSG:
      return {
        ...initialState,
        errMsg: action.payload.errMsg
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const AuthContext = createContext();

const useProvideAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // retrieve on first open of app
  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getData('token');
      dispatch({ type: ACTIONS.RETRIEVE, payload: { token } });
    };

    bootstrapAsync();
    // dispatch({ type: ACTIONS.LOGOUT })
  }, []);

  const { login, logout, signup, onError} = useMemo(
    () => ({
      login: async (email, password, errCallback) =>
        loginUser(dispatch, email, password, errCallback),
      logout: async () => logoutUser(dispatch),
      signup: async (userData) => signupUser(dispatch, userData),
      onError: (errMsg) => dispatch({ type: ACTIONS.ERR_MSG, payload: { errMsg }})
    }),
    []
  );

  return { state, login, logout, signup, onError};
};

const AuthProvider = ({ children }) => {
  const authContext = useProvideAuth();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
