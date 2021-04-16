const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "clinic-schema.gql"),
  "utf8"
);

describe("Test Queries and Mutations", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  
})