const resolverMap = {
  User: {
    __resolveType(obj, context, info) {
      if (obj.is_doctor) {
        return "Doctors"
      }
      return "Patient";
    },
  },
};
