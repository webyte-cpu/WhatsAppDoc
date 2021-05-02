import React, {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { getData, removeData, storeData } from "./handleData";
import { loginUser, logoutUser } from "./authMethods";
import ACTIONS from "./actions";
import { gql, useQuery } from "@apollo/client";
import { GET_USER } from "./queries";
import jwt_decode from "jwt-decode";

const initial = {
  appState: {
    isLoading: true,
    user: null,
  },
  gqlError: { msg: "" }, // TODO: handle error
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

  return { ...state, login, logout };
};

const AuthProvider = ({ children }) => {
  const authContext = useProvideAuth();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
