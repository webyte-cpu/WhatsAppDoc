const objectFilter = (data) =>
  Object.keys(data).reduce((object, key) => {
    data[key] && (object[key] = data[key]);
    return object;
  }, {});

export default objectFilter;
