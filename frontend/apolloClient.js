import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getData } from "./src/screens/auth/utils/handleData";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Platform } from "react-native";

if (!process.env.EXPO_IP_ADDRESS && Platform.OS !== "web")
  throw new Error("No expo ip provided");

const httpLink = new HttpLink({
  uri: `http://${
    Platform.OS === "web" ? "localhost" : process.env.EXPO_IP_ADDRESS
  }:4000/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`GraphQL Error: ${message}`)
    );
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = getData("token");
  headers.authorization = token ? `Bearer ${token}` : "";
  return { headers };
});


const client = new ApolloClient({
  link: { ...authLink, ...errorLink, ...httpLink },
  cache: new InMemoryCache(),
});
export default client;
