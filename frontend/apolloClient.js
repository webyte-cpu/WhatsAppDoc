import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getData } from "./src/screens/auth/utils/handleData";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Platform } from "react-native";
import { useAuth } from "./src/screens/auth/utils/authProvider";

if (!process.env.EXPO_IP_ADDRESS && Platform.OS !== "web")
  throw new Error("No expo ip provided");

const ApolloClientProvider = ({ children }) => {
  const auth = useAuth();

  const httpLink = new HttpLink({
    uri: `http://${
      Platform.OS === "web" ? "localhost" : process.env.EXPO_IP_ADDRESS
    }:4000/graphql`,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // if (graphQLErrors) {
    //   graphQLErrors.map(({ extensions }) => {
    //     switch (extensions.code) {
    //       case "VALIDATION_ERROR": {
    //         auth.setGQLErr("Invalid email/password");
    //         break;
    //       }
    //       default: {
    //         console.error("Error code not supported");
    //       }
    //     }
    //   });
    // }
    if (networkError) {
      auth.setGQLErr("No internet connection");
      console.error(`Network Error: ${networkError.message}`);
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getData("token");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
