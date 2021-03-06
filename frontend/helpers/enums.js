const enums = {
  role: { ADMIN: "ADMIN", DOCTOR: "DOCTOR", PATIENT: "PATIENT" },
  sex: { MALE: "MALE", FEMALE: "FEMALE" },
  civilStatus: {
    SINGLE: "SINGLE",
    MARRIED: "MARRIED",
    DIVORCE: "DIVORCE",
    WIDOWED: "WIDOWED",
  },
  status: {
    PENDING: "PENDING",
    IN_QUEUE: "IN_QUEUE",
    ON_GOING: "ON_GOING",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
  },
  medicalTypes: {
    ALLERGIES: "ALLERGIES",
    SURGICAL: "SURGICAL",
    IMMUNIZATION: "IMMUNIZATION",
    LABRATORY: "LABRATORY",
    GENERAL: "GENERAL",
    OTHER: "OTHER",
  },
  verificationStatus: {
    PENDING: "PENDING",
    VERIFIED: "VERIFIED",
    UNVERIFIED: "UNVERIFIED",
    DECLINED: "DECLINED"
  },
};

export default enums;
