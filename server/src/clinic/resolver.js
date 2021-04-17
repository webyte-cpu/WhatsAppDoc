const resolverMap = {
  Query: {
    getClinic: (obj, arg) => {
      //get specific admin from the database
      console.log(arg);

      /* 
      if uuid doesnt exist get all data
      and check for auth
      */

      //replace with database data
      return; //sampleData;
    },
  },
  Mutation: {
    createClinic: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return arg;
    },
    updateClinic: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return arg;
    },
    deleteClinic: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return arg;
    },
  },
  // Subscription: {},
};

export default resolverMap;
