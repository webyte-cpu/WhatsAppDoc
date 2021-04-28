import address from "./address.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getAddress: async (obj, arg) => __.first(await address().get(arg.uid)),
  },
  Mutation: {
    createAddress: (obj, arg) => {
      return address().create(arg);
    },
    updateAddress: (obj, arg) => {
      return address().update(arg);
    },
    deleteAddress: (obj, arg) => {
      return address().remove(arg.uid);
    },
  },
  // Subscription: {},
};

export default resolverMap;
