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
};

const reducer = (initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...initialState,
        token: action.payload.token,
      };
    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        token: null,
      };
    case ACTIONS.RETRIEVE:
      return {
        ...initialState,
        token: action.payload.token,
        isLoading: false,
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

  const { login, logout, signup } = useMemo(
    () => ({
      login: async (email, password) => loginUser(dispatch, email, password),
      logout: async () => logoutUser(dispatch),
      signup: async (userData) => signupUser(dispatch, userData),
    }),
    []
  );

  return { state, login, logout, signup };
};

const AuthProvider = ({ children }) => {
  const authContext = useProvideAuth();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
