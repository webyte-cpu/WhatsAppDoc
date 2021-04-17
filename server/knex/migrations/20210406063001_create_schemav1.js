import pg from "../../db";

const up = function (knex) {
  return knex.schema

    .createTable("addresses", (table) => {
      table.uuid("address_uid").notNullable().primary();
      table.string("address");
      table.string("address_city").notNullable();
      table.string("address_province").notNullable();
      table.string("address_zip_code").notNullable();
      table.string("address_country").notNullable();
      table.string("address_coordinates");
    })

    .createTable("users", (table) => {
      table.uuid("user_uid").notNullable().primary();
      table.string("user_first_name").notNullable();
      table.string("user_middle_name");
      table.string("user_last_name").notNullable();
      table.string("user_email").notNullable().unique();
      table.string("user_password").notNullable();
      table.enu("user_role", ["ADMIN", "DOCTOR", "PATIENT"]).notNullable();
      table.string("user_img");
      table.timestamps();
    })

    .createTable("doctors", (table) => {
      table
        .uuid("doctor_uid")
        .references("users.user_uid")
        .notNullable()
        .primary();

      table.string("doctor_licence_num").notNullable();
      table.string("doctor_licence_img").notNullable();
      table
        .enu("doctor_verification_status", [
          "PENDING",
          "VERIFIED",
          "UNVERIFIED",
        ])
        .defaultTo("PENDING");
      table.integer("doctor_experience").defaultTo(0);
      table.string("doctor_about");
      table.string("doctor_educational");
      table.string("doctor_rating");
    })

    .createTable("specializations", (table) => {
      table.uuid("specialization_uid").notNullable().primary();
      table.string("specialization_title").notNullable();
    })

    .createTable("doctor_specializations", (table) => {
      table.uuid("doctor_specialization_uid").notNullable().primary();
      table.uuid("specialization_uid").notNullable();
      table.uuid("doctor_uid").notNullable();
    })

    .createTable("patients", (table) => {
      table
        .uuid("patient_uid")
        .references("users.user_uid")
        .notNullable()
        .primary();

      table.uuid("address_uid").references("addresses.address_uid");

      table.date("patient_birthdate").notNullable();
      table.string("patient_contact_number");
      table.integer("patient_weight");
      table.integer("patient_height");
      table.string("patient_nationality");
      table.enu("patient_sex", ["MALE", "FEMALE"]).notNullable();
      table.enu("patient_civil_status", [
        "SINGLE",
        "MARRIED",
        "DIVORCED",
        "WIDOWED",
      ]);
    })

    .createTable("medical_infos", (table) => {
      table.uuid("medical_info_uid").notNullable().primary();
      table
        .uuid("patient_uid")
        .references("patients.patient_uid")
        .notNullable();
      table.string("patient_family_history");
      table.string("patient_social_history");
      table.string("patient_medical_history");
    })

    .createTable("medical_records", (table) => {
      table.uuid("medical_record_uid").notNullable().primary();
      table
        .uuid("patient_uid")
        .references("patients.patient_uid")
        .notNullable();
      table.uuid("doctor_uid").references("doctors.doctor_uid").notNullable();
      table.enu("medical_record_type", [
        "ALLERGIES",
        "SURGICAL",
        "IMMUNIZATION",
        "LABRATORY",
        "GENERAL",
        "OTHER",
      ]);
      table.string("medical_record_title").notNullable();
      table.string("medical_record_description");
      table.timestamps();
    })

    .createTable("medical_record_attached_file", (table) => {
      table.uuid("attached_file_uid").notNullable().primary();
      table
        .uuid("medical_record_uid")
        .references("medical_records.medical_record_uid")
        .notNullable();
      table.string("attached_file_path");
      table.timestamps();
    })

    .createTable("doctor_reviews", (table) => {
      table.uuid("doctor_review_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid").notNullable();
      table
        .uuid("patient_uid")
        .references("patients.patient_uid")
        .notNullable();
      table.string("doctor_review_description");
      table.integer("doctor_review_rating");
      table.timestamps();
    })

    .createTable("bookmarks", (table) => {
      table.uuid("bookmark_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid").notNullable();
      table
        .uuid("patient_uid")
        .references("patients.patient_uid")
        .notNullable();
    })

    .createTable("clinics", (table) => {
      table.uuid("clinic_uid").notNullable().primary();
      table
        .uuid("address_uid")
        .references("addresses.address_uid")
        .notNullable();
      table.string("clinic_name").notNullable();
      table.string("clinic_room_no").notNullable();
    })

    .createTable("doctor_clinics", (table) => {
      table.uuid("doctor_clinic_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid").notNullable();
      table.uuid("clinic_uid").references("clinics.clinic_uid").notNullable();
      table.integer("minimum_scheduling_notice_mins").notNullable();
      table.integer("slot_duration_in_mins").notNullable();
      table.float("consultation_fee");
    })

    .createTable("schedules", (table) => {
      table.uuid("schedule_uid").notNullable().primary();
      table
        .uuid("doctor_clinic_uid")
        .references("doctor_clinics.doctor_clinic_uid")
        .notNullable();

      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.string("day_of_week");
    })

    .createTable("unavailable_dates", (table) => {
      table.uuid("unavailable_date_uid").notNullable().primary();
      table
        .uuid("doctor_clinic_uid")
        .references("doctor_clinics.doctor_clinic_uid")
        .notNullable();

      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.date("unavailable_date");
    })

    .createTable("appointments", (table) => {
      table.uuid("appointments_uid").notNullable().primary();
      table
        .uuid("patient_uid")
        .references("patients.patient_uid")
        .notNullable();

      table
        .uuid("doctor_clinic_uid")
        .references("doctor_clinics.doctor_clinic_uid")
        .notNullable();

      table
        .enu("appointment_status", [
          "PENDING",
          "IN_QUEUE",
          "ON_GOING",
          "DONE",
          "CANCELLED",
        ])
        .notNullable();
      table.timestamp("appointment_timestamp").notNullable();
      table.string("appointment_doctor_remarks");
    });
};

const down = function (knex) {
  return knex.schema
    .dropTable("appointments")
    .dropTable("unavailable_dates")
    .dropTable("schedules")
    .dropTable("doctor_clinics")
    .dropTable("clinics")
    .dropTable("bookmarks")
    .dropTable("doctor_reviews")
    .dropTable("medical_record_attached_file")
    .dropTable("medical_records")
    .dropTable("medical_infos")
    .dropTable("patients")
    .dropTable("doctor_specializations")
    .dropTable("specializations")
    .dropTable("doctors")
    .dropTable("users")
    .dropTable("addresses");
};

export { up, down };
