import address from "./model.js";

export default {
  Query: {
    getAddress: (obj, arg) => address.get(arg.uid),
  },
  Mutation: {
    createAddress: (obj, arg) => address.create(arg),
    updateAddress: (obj, arg) => address.update(arg),
    deleteAddress: (obj, arg) => address.remove(arg.uid),
  },
  // Subscription: {},
};
