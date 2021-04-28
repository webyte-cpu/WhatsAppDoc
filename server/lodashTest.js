import _ from "lodash";
import faker from "faker";
import bcrypt from "bcrypt";

let list = [];

const x = async () => {
  for (let index = 0; index < 10; index++) {
    const pass = faker.internet.password(8, true);
    const email = faker.internet.email();
    console.log("Raw login:", `Email: ${email} Pass: ${pass}`);
    list.push({
      user_uid: faker.datatype.uuid(),
      user_first_name: faker.name.firstName(),
      user_middle_name: faker.name.middleName(),
      user_last_name: faker.name.lastName(),
      user_email: email,
      user_password: bcrypt.hashSync(pass, 10),
      user_role: "ADMIN",
      created_at: faker.date.past(),
    });
  }
};

x();

console.log(list);
