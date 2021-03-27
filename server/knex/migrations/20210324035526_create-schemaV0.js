const up = function (knex) {
  return knex.schema

    .createTable("admins", (table) => {
      table.uuid("admin_uid").notNullable().primary();
      table.string("admin_first_name");
      table.string("admin_last_name");
      table.string("admin_email");
      table.string("admin_password");
      table.timestamp("created_at");
    })

    .createTable("addresses", (table) => {
      table.uuid("address_uid").notNullable().primary();
      table.string("address_street");
      table.string("address_city");
      table.string("address_province");
      table.string("address_zip_code");
      table.string("address_country");
      table.string("address_coordinates");
    })

    .createTable("users", (table) => {
      table.uuid("user_uid").notNullable().primary();
      table.uuid("address_uid").references("addresses.address_uid");
      table.string("user_first_name").notNullable();
      table.string("user_last_name").notNullable();
      table.string("user_email").notNullable();
      table.string("user_password").notNullable();
      table.string("user_sex").notNullable();
      table.string("user_birthdate").notNullable();
      table.string("user_phone_number");
      table.string("user_weight");
      table.string("user_height");
      table.string("user_civil_status");
      table.string("user_nationality");
      table.boolean("user_is_doctor").defaultTo(false).notNullable();
      table.timestamp("created_at");
    })

    .createTable("doctors", (table) => {
      table.uuid("doctor_uid").notNullable().primary();
      table.uuid("user_uid").references("users.user_uid");
      table.string("doctor_licence_no").notNullable();
      table.string("doctor_experience");
      table.string("doctor_rating");
      table.boolean("doctor_is_verified").defaultTo(false);
      table.string("doctor_about");
      table.string("doctor_bio");
    })

    .createTable("specializations", (table) => {
      table.uuid("specialization_uid").notNullable().primary();
      table.string("specialization_description");
      table.string("specialization_tag");
    })

    .createTable("assigned_specialization", (table) => {
      table.uuid("assigned_specialization_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid");
      table
        .uuid("specialization_uid")
        .references("specializations.specialization_uid");
    })

    .createTable("certificates", (table) => {
      table.uuid("certificate_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid");
      table.string("ceritficate_descrition");
      table.string("ceritficate_img");
    })

    .createTable("patients", (table) => {
      table.uuid("patient_uid").notNullable().primary();
      table.uuid("user_uid").references("users.user_uid").notNullable();
      table.string("patient_status");
    })

    .createTable("medical_infos", (table) => {
      table.uuid("medical_info_uid").notNullable().primary();
      table.uuid("patient_uid").references("patients.patient_uid");
      table.string("patient_family_history");
      table.string("patient_social_history");
      table.string("patient_medical_history");
    })

    .createTable("medical_records", (table) => {
      table.uuid("medical_record_uid").notNullable().primary();
      table.uuid("patient_uid").references("patients.patient_uid");
      table.string("medical_record_type");
      table.string("medical_record_title");
      table.string("medical_record_description");
      table.timestamp("created_at");
    })

    .createTable("medical_record_attached_file", (table) => {
      table.uuid("attached_file_uid").notNullable().primary();
      table
        .uuid("medical_record_uid")
        .references("medical_records.medical_record_uid");
      table.string("attached_file_remarks");
      table.string("attached_file_dir");
      table.timestamp("created_at");
    })

    .createTable("doctor_reviews", (table) => {
      table.uuid("doctor_review_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid");
      table.uuid("patient_uid").references("patients.patient_uid");
      table.string("review_description");
      table.integer("rating");
      table.timestamp("created_at");
    })

    .createTable("bookmarks", (table) => {
      table.uuid("bookmark_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid");
      table.uuid("patient_uid").references("patients.patient_uid");
    })

    .createTable("clinics", (table) => {
      table.uuid("clinic_uid").notNullable().primary();
      table.string("clinic_name").notNullable();
      table.string("clinic_room_no").notNullable();
    })

    .createTable("clinics_address", (table) => {
      table.uuid("clinics_address_uid").notNullable().primary();
      table.uuid("address_uid").references("addresses.address_uid");
      table.uuid("clinic_uid").references("clinics.clinic_uid");
    })

    .createTable("doctors_clinic", (table) => {
      table.uuid("doctor_clinic_uid").notNullable().primary();
      table.uuid("doctor_uid").references("doctors.doctor_uid");
      table.uuid("clinic_uid").references("clinics.clinic_uid");
      table.integer("maximum_appointment_per_day").notNullable();
      table.integer("minimum_appointment_notice").notNullable();
    });
};

const down = function (knex) {
  return knex.schema
    .dropTable("doctors_clinic")
    .dropTable("clinics_address")
    .dropTable("clinics")
    .dropTable("bookmarks")
    .dropTable("doctor_reviews")
    .dropTable("medical_record_attached_file")
    .dropTable("medical_records")
    .dropTable("medical_infos")
    .dropTable("patients")
    .dropTable("certificates")
    .dropTable("assigned_specialization")
    .dropTable("specializations")
    .dropTable("doctors")
    .dropTable("users")
    .dropTable("addresses")
    .dropTable("admins");
};

/* 

not included table is:
- appointment
- schedule

*/
export { up, down };
