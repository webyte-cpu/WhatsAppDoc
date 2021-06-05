import __ from "lodash";

const objectFilter = (data) =>
  Object.keys(data).reduce((object, key) => {
    !__.isUndefined(data[key]) && (object[key] = data[key]);
    return object;
  }, {});

export default objectFilter;
