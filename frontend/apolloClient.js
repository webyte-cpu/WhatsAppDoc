import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Platform } from "react-native";
import { getData } from "./src/screens/auth/utils/handleData";

if (!process.env.EXPO_IP_ADDRESS && Platform.OS !== 'web') throw new Error("No expo ip provided");

const client = new ApolloClient({
  uri: `http://${
    Platform.OS === "web" ? "localhost" : process.env.EXPO_IP_ADDRESS
  }:4000/graphql`,
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
