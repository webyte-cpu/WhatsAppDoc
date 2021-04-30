import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Platform } from 'react-native';

if (!process.env.EXPO_IP_ADDRESS) throw new Error('No expo ip provided');

const client = new ApolloClient({
  uri: `http://${
    Platform.OS === 'web' ? 'localhost' : process.env.EXPO_IP_ADDRESS
  }:4000/graphql`,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
