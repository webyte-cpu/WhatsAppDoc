const schedule = [
  { uid: '22', startTime: '07:30', endTime: '12:00', daysOftheWeek: [1,2], slotDurationInMins: 30 },
  { uid: '55',  startTime: '13:00', endTime: '15:30', daysOftheWeek: [1,2], slotDurationInMins: 30 }
]

const appointments = [
  { uid: '1', appointmentTime: "07:30", daysOftheWeek: [1], status: '', createdAt: '', doctorClinicUid: '', patientUID: '' },
  { uid: '2', appointmentTime: "09:30", daysOftheWeek: [1] },
  { uid: '3', appointmentTime: "01:00", endTime: '01:30', daysOftheWeek: [1] },
]


// uid: appointments_uid,
//   patientUid: patient_uid,
//   doctorClinicUid: doctor_clinic_uid,
//   status: appointment_status,
//   time: appointment_timestamp,
//   doctorRemarks: appointment_doctor_remarks,