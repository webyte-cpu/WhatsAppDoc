import { UserInputError } from "apollo-server-errors";
import { GraphQLScalarType, Kind } from "graphql";

const passwordScalar = new GraphQLScalarType({
  name: "Password",
  description: "Password custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    const password = ast.value;

    //check password format
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g.test(
      password
    );

    if (ast.kind === Kind.STRING && isValid) {
      //return hashed password
      return password;
    }

    throw new UserInputError(
      "Password format is not valid; Minimum eight characters, must contain at least one uppercase letter, one lowercase letter and one number"
    );
  },
});

export default passwordScalar;
