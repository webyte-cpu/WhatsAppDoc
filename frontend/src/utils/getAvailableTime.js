import * as R from 'ramda';
import { getTimeForDisplay, formatNum } from "./generateTimeSlot.js";
const doctorClinicData = {
  slotDuration: 30,
  intervals: [
    {
      startTime: '06:00',
      endTime: '12:00',
      doctorClinicUid: '0de7cd8a-6410-4ebb-8006-45bee76491ea',
      uid: 'f501dd6e-3048-41dc-9bc5-7f2233acdb7f',
      days: [1,3,5]
    }, {
      startTime: '13:00',
      endTime: '15:30',
      doctorClinicUid: '0de7cd8a-6410-4ebb-8006-45bee76491ea',
      uid: 'f501dd6e-3048-41dc-9bc5-7f2233acdb7f',
      days: [1,3,5]
    }, {
      startTime: '00:00',
      endTime: '14:30',
      doctorClinicUid: '0de7cd8a-6410-4ebb-8006-45bee76491ea',
      uid: '2eac6312-4249-4f19-8e45-ebdde07ce83f',
      days: [2,4]
    }
  ]
}

//? IN_QUEUE = ACCEPTED

/**
 * DATE FORMAT: YYYY-MM-DDTHH:MM
 */

const appointmentsSameDay = [ // days = 1 
  {
    appointmentUID: "ea6e4474-709f-439c-b6e2-2bb1113b45cc",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "79c1c7f3-2267-42cf-b505-cc2bf43924a3",
    createdAt: new Date("2021-05-15T04:00"),
    dateTime: new Date('2021-05-17T06:00'),
    status: "ON_GOING"
  }, {
    appointmentUID: "7cadcee6-2b38-49d7-b138-8789dd1ed686",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "1543ea94-b0fa-436d-88c3-e8849246dd95",
    createdAt: new Date("2021-05-16T13:30"),
    dateTime: new Date('2021-05-17T13:30'),
    status: "PENDING"
  }, {
    appointmentUID: "c23410cd-c386-4b85-9c7a-3143f11055eb",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "90f0bbf2-c32b-4675-b4a0-4638f8cc9bdb",
    createdAt: new Date("2021-05-12T09:30"),
    dateTime: new Date('2021-05-17T09:30'),
    status: "IN_QUEUE"
  }, {
    appointmentUID: "b396b7e6-c972-4714-89a0-4bc6fdc887da",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "69d0c3d3-7cc2-4d3e-a58d-60033a1db51b",
    createdAt: new Date("2021-05-14T14:00"),
    dateTime: new Date('2021-05-18T14:00'),
    status: "IN_QUEUE"
  }, {
    appointmentUID: "fb7852f5-2040-4b86-8163-1a56f0aa7c77",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "69d0c3d3-7cc2-4d3e-a58d-60033a1db51b",
    createdAt: new Date("2021-05-16T11:00"),
    dateTime: new Date('2021-05-17T24:00'),
    status: "CANCELLED"
  },
  {
    appointmentUID: "fb7852f5-2040-4b86-8163-1a56f0aa7c77",
    doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
    patientUid: "69d0c3d3-7cc2-4d3e-a58d-60033a1db51b",
    createdAt: new Date("2021-05-12T13:00"),
    dateTime: new Date('2021-05-19T24:00'),
    status: "CANCELLED"
  }
]

const convertAppointment = (appointments) => appointments.map((appointment) => {
  const time = new Date(appointment.dateTime)
    .toLocaleTimeString(undefined, {timeStyle:'short'})
    const [hours, min] = time.split(':')
    const [minutes, ampm] = min.split(' ')

  return {...appointment, from: { hours: Number(hours), minutes: Number(minutes), ampm: ampm.toLowerCase() }}
})

const formatDate = (date) => {
  const [day, month, year] = new Date(date).toLocaleDateString().split('/')
  return `${year}-${month}-${day}`
}

export const timeToString = (timeObj) => {
  const formattedHours = formatNum(timeObj.hours)
  const formattedMins = formatNum(timeObj.minutes)
  const formattedPeriod = timeObj.ampm.toUpperCase()

  return (`${formattedHours}:${formattedMins} ${formattedPeriod}`)
}

export const getMatchingInterval = (intervals, slotDuration, chosenDate) => {
  const chosenDay = chosenDate.getDay()
  const scheduleTimeSlots = getTimeForDisplay(intervals, slotDuration)
  const matchingInterval = scheduleTimeSlots.filter((interval) => interval.days.includes(chosenDay))
  
  if(matchingInterval.length === 0) {
    return null
  }
  return matchingInterval[0]
}

export const getAvailableTime = (intervals, slotDuration, appointments, chosenDate) => {
  let results = null;

  const chosenDateString = formatDate(chosenDate)
  const matchingInterval = getMatchingInterval(intervals, slotDuration, chosenDate)
  
  if(matchingInterval) {
    results = matchingInterval.time
  
    if(appointments) {
      const appointmentList = convertAppointment(appointments)
      const occupiedTimes = appointmentList.filter((appointment) => appointment.date === chosenDateString && appointment.status !== 'CANCELLED') 
      const byStartTime = (schedule, appointment) => R.equals(schedule.from, appointment.from)
      
      results = R.differenceWith(byStartTime, matchingInterval.time, occupiedTimes)
    }
  }

  return results;
}

// console.log(getAvailableTime(doctorClinicData.intervals, doctorClinicData.slotDuration, appointmentsSameDay, new Date('2021-05-18')))