const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const resolvers = require("./resolver");
const { expect } = require("chai");

const schema = fs.readFileSync(
  path.join(__dirname, ".", "address-schema.gql"),
  "utf8"
);

let tester;

beforeAll(() => {
  tester = new EasyGraphQLTester(schema, resolvers);
});

const mutation = `
  mutation createAddress(
    $address: String!
    $city: String!
    $province: String!
    $zipCode: String!
    $country: String!
    $coordinates: String
  )
     {
    createAddress(
      address: $address, 
      city: $city, 
      province: $province, 
      zipCode: $zipCode,
      country: $country,
      coordinates: $coordinates
    ) {
      city
      coordinates
    }
  }
`
describe("Create Address", () => {
  it('Should pass if the query is correct', () => {
    tester.test(true, mutation, {
      addres: "Ungka II",
      city: "Pavia",
      province: "Iloilo",
      zipCode: "123",
      country: "Philippines",
      coordinates: "11234"
    })
  })
})


