import doctor from "./model.js";
import specialization from "../specialization/model.js";

export default {
  Doctor: {
    specialization: (doctor) => specialization.assignedTo(doctor.uid),
  },

  Query: {
    getDoctor: (obj, arg) => doctor.get(arg.uid),
  },
  Mutation: {
    createDoctor: (obj, arg) => doctor.create(arg),
    updateDoctor: (obj, arg) => doctor.update(arg),
    deleteDoctor: (obj, arg) => doctor.remove(arg.uid),
  },
  // Subscription: {},
};
