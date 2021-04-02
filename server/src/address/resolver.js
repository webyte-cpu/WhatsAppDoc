import address from "./address.js";

const resolverMap = {
  Query: {
    getAddress: (obj, arg) => {
      //get specific admin from the database
      console.log(arg);

      /* 
      if uuid doesnt exist get all data
      and check for auth
      */

      //replace with database data
      return address.get(arg.uid);
    },
  },
  Mutation: {
    createAddress: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return address.create(arg);
    },
    updateAddress: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return address.update(arg);
    },
    updateDelete: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return address.remove(arg.uid);
    },
  },
  // Subscription: {},
};

export default resolverMap;
