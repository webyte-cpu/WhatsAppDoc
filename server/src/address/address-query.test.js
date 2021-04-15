const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "address-schema.gql"),
  "utf8"
);

const tester = new EasyGraphQLTester(schemaCode);

describe("Test Schema, Queries and Mutation", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  it("Should pass with a valid query", () => {
      
    const query = `
    {
      getAddress(uid: 3) {
        address
        city
        province
      }
    }      
    `;
    tester.test(true, query);
  });

  it('Should fail if the query is invalid', () => {
    const invalidQuery = `
        {
          getAddress(uid: 3) {
            address
            city
            province
            user
          }
        }
      `

    tester.test(false, invalidQuery)
  })
}); 