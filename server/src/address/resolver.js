import address from "./model.js";

export default {
  Query: {
    getAddress: (obj, arg) => address.get(arg.uid),
    getAllAddresses: (obj, arg) => address.getAll(),
  },
  Mutation: {
    createAddress: (obj, arg, { loader }) => address.create(arg),
    updateAddress: async (obj, arg, { loader }) => {
      const response = await address.update(arg)
      loader?.address?.clear(arg.uid)
      return response;
    },
    deleteAddress: async (obj, arg, { loader }) => {
      const response = await address.remove(arg.uid)
      loader?.address?.clear(arg.uid)
      return response;
    },
  },
  // Subscription: {},
};
