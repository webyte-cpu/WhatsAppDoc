const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "address-schema.gql"),
  "utf8"
);

