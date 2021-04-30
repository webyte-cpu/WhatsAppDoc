import admin from "../models/admin.js";
import doctor from "../models/doctor.js";
import patient from "../models/patient.js";
import user from "../models/user.js";

const query = {
  admin: () => admin.get(),
  user: () => user.get(),
  doctor: () => doctor.getAll()
  // patient: () => patient.get(),
};

export default query;
