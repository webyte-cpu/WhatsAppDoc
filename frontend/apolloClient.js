import { useAuth } from "./src/screens/auth/utils/authProvider";
import { getData } from "./src/screens/auth/utils/handleData";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { Platform } from "react-native";
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import * as Location from 'expo-location';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("No GOOGLE_API_KEY provided") 
} else {
  Location.setGoogleApiKey(process.env.GOOGLE_API_KEY)
}

if (!process.env.EXPO_IP_ADDRESS && Platform.OS !== "web")
  throw new Error("No expo ip provided");

const ApolloClientProvider = ({ children }) => {
  const auth = useAuth();

  const httpLink = new HttpLink({
    uri: `http://${
      Platform.OS === "web" ? "localhost" : process.env.EXPO_IP_ADDRESS
    }:4000/graphql`,
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${
      Platform.OS === "web" ? "localhost" : process.env.EXPO_IP_ADDRESS
    }:4000/subscriptions`,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

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
    link: ApolloLink.from([errorLink, authLink, splitLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
