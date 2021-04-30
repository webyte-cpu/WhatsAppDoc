import { ApolloError, UserInputError } from 'apollo-server-errors';
import { GraphQLScalarType, Kind } from 'graphql';

const passwordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'Password custom scalar type',
  serialize(value) {
    return value;
  },
  parseValue(password) {
    //check password format
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g.test(
      password
    );

    if (isValid) {
      return password;
    }

    throw new ApolloError(
      `Password format is not valid; Password must be 8 or more characters long and contain at least one of the following:
      number, uppercase letter, lowercase letter, and symbol.`,
      'INVALID_PASSWORD'
    );
  },
  parseLiteral(ast) {
    const password = ast.value;
    //check password format
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g.test(
      password
    );

    if (ast.kind === Kind.STRING && isValid) {
      return password;
    }

    throw new ApolloError(
      `Password format is not valid; Password must be 8 or more characters long and contain at least one of the following:
      number, uppercase letter, lowercase letter, and symbol.`,
      'INVALID_PASSWORD'
    );
  },
});

export default passwordScalar;
