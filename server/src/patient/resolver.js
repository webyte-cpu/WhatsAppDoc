const resolverMap = {
  Query: {
    getPatient: (obj, arg) => {
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
    createPatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
    updatePatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
    deletePatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
  },
  //Subscription: {},
};

export default resolverMap;
