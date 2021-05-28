import Dataloader from "dataloader";
import clinic from "../clinic/model.js";
import appointment from "../appointment/model.js";
import schedule from "../schedule/model.js";
import address from "../address/model.js";
import __ from "lodash";

const loader = (query, column) =>
  new Dataloader(async (ids) => {
    const dbResponse = await query(ids);
    const groupById = __.groupBy(dbResponse, (data) => data[column]);
    return ids.map((id) => groupById[id]);
  });

const loaders = {
  clinic: loader((ids) => clinic.find({ doctorUid: ids }), "doctorUid"),
  schedule: loader(
    (ids) => schedule.find({ doctorClinicUid: ids }),
    "doctorClinicUid"
  ),
  appointment: loader(
    (ids) => appointment.find({ doctorClinicUid: ids }),
    "doctorClinicUid"
  ),
  address: loader((ids) => address.find({ uid: ids }), "uid"),
};

const findloader = (key, query, column) => {
  if (__.isUndefined(loaders[key])) {
    loaders[key] = loader(query, column);
  }
  return loaders[key];
};

export default {
  ...loaders,
  single: {
    load: ({ key, query, column, id }) => {
      const loader = findloader(key, query, column);
      return loader.load(id);
    },
  },
};
