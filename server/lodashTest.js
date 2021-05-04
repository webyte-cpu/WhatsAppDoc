import _ from "lodash";
import faker from "faker";
import bcrypt from "bcrypt";

const x = () => {
  let list = [];
  for (let index = 0; index < 10; index++) {
    try {
      let pass = faker.internet.password();
      const email = faker.internet.email();
      console.log("Raw login:", `Email: ${email} Pass: ${pass}`);
      list.push({
        user_uid: faker.datatype.uuid(),
        user_first_name: faker.name.firstName(),
        user_middle_name: faker.name.middleName(),
        user_last_name: faker.name.lastName(),
        user_email: email,
        user_birthdate: faker.date.past(),
        user_sex: faker.helpers.randomize(["MALE", "FEMALE"]),
        user_password: bcrypt.hashSync(pass, 10),
        user_role: faker.helpers.randomize(["ADMIN", "PATIENT", "DOCTOR"]),
        created_at: faker.date.past(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return list;
};

console.log(x());
