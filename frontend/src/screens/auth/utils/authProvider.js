import React, { createContext, useReducer, useEffect, useContext } from "react";
import { getData, removeData, storeData } from "./handleData";
import ACTIONS from "./actions";
import jwt_decode from "jwt-decode";

const initial = {
  appState: {
    isLoading: true,
    user: null,
  },
  gqlError: { msg: "" },
};

const AuthContext = createContext(initial);

const reducer = (initial, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...initial,
        appState: {
          ...initial.appState,
          user: action.payload.user,
        },
      };
    case ACTIONS.LOGOUT:
      return {
        ...initial,
        appState: {
          ...initial.appState,
          user: null,
        },
      };
    case ACTIONS.RETRIEVE:
      return {
        ...initial,
        appState: {
          isLoading: false,
          user: action.payload.user,
        },
      };
    case ACTIONS.SET_GQL_ERR:
      return {
        ...initial,
        gqlError: {
          msg: action.payload.gqlError,
        },
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const useProvideAuth = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const retrieveToken = async () => {
      let user = null;
      const token = await getData("token");
      if (token) {
        user = jwt_decode(token);
      }
      const expiry = new Date(user?.exp * 1000)
      const issuedAt = new Date(user?.iat * 1000)
      if(Date.now() >= expiry) { // TODO: add refresh token
        alert('Session expired, please login again.')
        logout()
      }
      dispatch({ type: ACTIONS.RETRIEVE, payload: { user } });
    };

    retrieveToken();
  }, []);

  const login = async (token) => {
    await storeData("token", token);
    const user = jwt_decode(token);
    dispatch({ type: ACTIONS.LOGIN, payload: { user } });
  };

  const logout = async () => {
    await removeData("token");
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const setGQLErr = (gqlError) => {
    dispatch({ type: ACTIONS.SET_GQL_ERR, payload: { gqlError } });
  };

  return { ...state, login, logout, setGQLErr };
};

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const authContext = useProvideAuth();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
