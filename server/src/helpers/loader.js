import specialization from "../specialization/model.js";
import appointment from "../appointment/model.js";
import schedule from "../schedule/model.js";
import address from "../address/model.js";
import clinic from "../clinic/model.js";
import Dataloader from "dataloader";
import __ from "lodash";

const loader = (model, column) => {
  const columnLoader = {};

  return Object.assign(
    new Dataloader(async (ids) => {
      const dbResponse = await model.find({ [column]: ids });
      const groupById = __.groupBy(dbResponse, (data) => data[column]);
      return ids.map((id) => groupById[id]);
    }),
    {
      groupBy: (column) => {
        if (__.isUndefined(columnLoader[column])) {
          columnLoader[column] = loader(model, column);
          console.log("added to column loader");
        }
        return columnLoader[column];
      },
      columnLoader,
    }
  );
};

export default {
  clinic: loader(clinic, "doctorUid"),
  schedule: loader(schedule, "doctorClinicUid"),
  appointment: loader(appointment, "doctorClinicUid"),
  address: loader(address, "uid"),
  specialization: loader(specialization, "doctorUid"),
};
