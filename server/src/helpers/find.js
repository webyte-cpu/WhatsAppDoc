import objectFilter from "./objectFilter.js";
import __ from "lodash";
export default (table, mapFromDb, mapToDb, knex, builder) =>
  async (obj, trx = knex) => {
    try {
      const pair = __.toPairs(objectFilter(mapToDb(obj)));
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
