import admin from "./admin.js";

const sampleData = [
  //sample data
  {
    uid: "98b766c0-aae3-407c-bbb7-739c7800ba0f",
    firstName: "Kyle",
    lastName: "Osunero",
    email: "kyle.osunero@webyte.io",
    password: "letmein",
  },
  {
    uid: "cbe20d80-9a83-4c6f-8063-77a8dfff4bbc",
    firstName: "Edelynn",
    lastName: "Mallare",
    email: "edelynn.mallare@webyte.com",
    password: "secret",
  },
];

const resolverMap = {
  Query: {
    getAdmin: (obj, arg) => {
      //get specific admin from the database
      console.log(arg);
      //replace with database data
      return arg?.uid
        ? sampleData.filter((admin) => admin.uid === arg.uid)
        : sampleData;
    },
  },
  Mutation: {
    createAdmin: (obj, args) => {
      //add admin to database
      console.log(args);
    },
    updateAdmin: (obj, arg) => {
      //update admin database
      console.log(arg);
    },
    deleteAdmin: (obj, arg) => {
      //Delete admin from the database
      console.log(arg);
    },
  },
  //Subscription: {},
};

export default resolverMap;
