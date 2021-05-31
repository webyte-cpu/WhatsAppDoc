import objectFilter from "./objectFilter.js";
import __ from "lodash";
export default (table, mapFromDb, mapToDb, knex, builder) =>
  async (obj, trx = knex) => {
    try {
      const checkKeys = (obj, mapToDb) =>
        __.keysIn(obj).reduce((acc, key) => {
          if (key.includes(".")) {
            const splitKey = __.split(key, ".");
            const table = splitKey[0];
            const column = splitKey[1];
            const columnToDb = (column) =>
              __.flow([mapToDb, objectFilter, __.keysIn])({ [column]: true });
            const newColumn = `${table}.${columnToDb(column)}`;
            return { ...acc, [newColumn]: obj[key] };
          }

          return { ...acc, ...objectFilter(mapToDb({ [key]: obj[key] })) };
        }, {});

      const pair = __.toPairs(checkKeys(obj, mapToDb));
      const zip = __.zip(...pair);
      const column = zip[0];
      const values = __.zip(...zip[1]);

      let query = trx.select("*").from(table).whereIn(column, values);

      if (!__.isUndefined(builder)) {
        query = builder(query);
      }

      const dbResponse = await query;

      return dbResponse.map(mapFromDb);
    } catch (error) {
      console.error(error);
    }
  };
