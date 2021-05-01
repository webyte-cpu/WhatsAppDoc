import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getData } from './src/screens/auth/utils/handleData';
import { Platform } from 'react-native';

if (!process.env.EXPO_IP_ADDRESS) throw new Error('No expo ip provided');

const httpLink = createHttpLink({
  uri: `http://${
    Platform.OS === 'web' ? 'localhost' : process.env.EXPO_IP_ADDRESS
  }:4000/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getData('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

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
