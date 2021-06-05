import objectFilter from "../helpers/objectFilter.js";
import findModel from "../helpers/find.js";
import pg from "../../db/index.js";
import { v4 as uuidV4 } from "uuid";
import __ from "lodash";

const fromDb = (data) =>
  objectFilter({
    uid: data.notification_uid,
    userUid: data.user_uid,
    title: data.notification_title,
    description: data.notification_description,
    createdAt: data.created_at,
    content: data.notification_content,
    type: data.notification_type,
    sourceType: data.notification_sourceType,
    isSeen: data.notification_is_seen,
    isArchived: data.notification_is_archive,
  });

const toDb = (data) =>
  objectFilter({
    notification_uid: data.uid,
    user_uid: data.userUid,
    notification_title: data.title,
    notification_description: data.description,
    created_at: data.createdAt,
    notification_content: data.content,
    notification_type: data.type,
    notification_sourceType: data.sourceType,
    notification_is_seen: data.isSeen,
    notification_is_archive: data.isArchived,
  });

export const create = async (notification, knex = pg) => {
  notification.uid = notification.uid || uuidV4();
  const dbResponse = await knex
    .insert(toDb(notification))
    .into("notifications")
    .returning("*");
  return fromDb(__.first(dbResponse));
};

export const get = async (userUid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("notifications")
    .where({ user_uid: userUid })
    .orderBy("created_at", "desc");
  return dbResponse.map(fromDb);
};

export const update = async (uid, notification, knex = pg) => {
  const dbResponse = await knex("notifications")
    .where({ notification_uid: uid })
    .update(toDb(notification))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

export const archiveAll = async (uids, knex = pg) => {
  const datas = uids.map((uid) => toDb({ isArchived: true }));

  const dbResponse = await knex("notifications")
    .whereIn("notification_uid", uids)
    .update(datas)
    .returning("*");

  return dbResponse.map(fromDb);
};

export const find = findModel("notifications", fromDb, toDb, pg);
