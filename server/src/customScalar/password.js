import { ApolloError, UserInputError } from "apollo-server-errors";
import { GraphQLScalarType, Kind } from "graphql";

const passwordScalar = new GraphQLScalarType({
  name: "Password",
  description: "Password custom scalar type",
  serialize(value) {
    throw "serial";
    return value;
  },
  parseValue(password) {
    //check password format
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g.test(
      password
    );

    if (isValid) {
      return password;
    }

    throw new ApolloError(
      `Password format is not valid; Minimum eight characters, must contain at least one uppercase letter, one lowercase letter and one number`,
      "INVALID_PASSWORD"
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
      `Password format is not valid; Minimum eight characters, must contain at least one uppercase letter, one lowercase letter and one number`,
      "INVALID_PASSWORD"
    );
  },
});

export default passwordScalar;
