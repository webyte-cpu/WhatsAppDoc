import admin from "./admin.js";

const query = {
  admin: () => admin.get(),
};

const mutation = {
  signUpAdmin: (obj, args, context, info) => ({}),
};

const subscription = {};

export default { query, mutation, subscription };
