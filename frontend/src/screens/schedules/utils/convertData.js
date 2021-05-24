import { convertTo12HrFormat, convertTo24HrFormat } from "../../../utils/generateTimeSlot.js";
import * as R from 'ramda';

export const intervalsFromDB = (schedules) => {

  const formattedIntervals = schedules.map((schedule) => {
    const from = convertTo12HrFormat(schedule.startTime)
    const to = convertTo12HrFormat(schedule.endTime)
    const days = schedule.daysOfTheWeek
    const newSchedule = R.omit(["startTime", "endTime", "daysOfTheWeek"], schedule)
    
    return ({
      from,
      to,
      days,
      ...newSchedule
    })
  })
  
  const bySameDays = R.groupWith((a,b) => R.equals(a.days, b.days), formattedIntervals)
                
  const intervals = bySameDays.map((group) => {
    const days = R.pluck(["days"], group)[0]
    const time = group.map((time) => R.omit(["days"], time))
    return {time, days}
  })

  return intervals
}

export const intervalsToDB = (intervals) => {
  const newSchedules = intervals.map((interval) => {
    return interval.time.map((data) => {
      const startTime = convertTo24HrFormat(data.from)
      const endTime = convertTo24HrFormat(data.to)
      const newInterval = R.omit(['from','to', '__typename'], data)

      return ({
        ...newInterval,
         startTime, 
         endTime, 
         daysOfTheWeek: interval.days
       })
    })
  })

  return R.flatten(newSchedules)
}

export const clinicDataFromDB = (clinicData) => {
  const formattedData = {
    clinicName: clinicData.name,
    address: {
      streetAddress: clinicData.address.address
    },
    schedulingNotice: Number(clinicData.minimumSchedulingNoticeMins),
    scheduleSlotDuration: clinicData.slotDurationInMins,
  }

  const newAddressData = R.omit(['address'], clinicData.address)
  clinicData.address = newAddressData

  const newClinicData = R.omit(['name','minimumSchedulingNoticeMins', 'slotDurationInMins'], clinicData)
  const mergedData = R.mergeDeepRight(newClinicData, formattedData)
  return mergedData
}

export const clinicDataToDB = (clinicData) => {
  const formattedData = {
    name: clinicData.clinicName,
    address: {
      address: clinicData.address.streetAddress
    },
    minimumSchedulingNoticeMins: Number(clinicData.schedulingNotice),
    slotDurationInMins: clinicData.scheduleSlotDuration,
  }

  const newAddressData = R.omit(['streetAddress','__typename'], clinicData.address)
  clinicData.address = newAddressData

  const newClinicData = R.omit(['clinicName','schedulingNotice', 'scheduleSlotDuration','__typename'], clinicData)
  const mergedData = R.mergeDeepRight(newClinicData, formattedData)
  return mergedData
}

const schedules = [
  {
    uid: "03d2a215-f7db-4255-8f77-25aecf546dd2",
    startTime: "08:00",
    endTime: "10:00",
    daysOfTheWeek: [
      3,
      4
    ]
  },
  {
    uid: "7bacfc3d-16ae-4e5e-8a84-b8e5e3082dc5",
    startTime: "12:00",
    endTime: "17:30",
    daysOfTheWeek: [
      3,
      4
    ]
  },
  {
    uid: "8dacfc3d-16ae-4e5e-8a84-b8e5e3082dc5",
    startTime: "08:00",
    endTime: "10:30",
    daysOfTheWeek: [
      2,
      4,
      6
    ]
  }
]

const intervals = [
  { 
    time: [
      {
        uid: "03d2a215-f7db-4255-8f77-25aecf546dd2",
        from: {hours: 8, minutes: 0, ampm: 'am'}, 
        to: {hours: 10, minutes: 0, ampm: 'am'}
      },
      {
        uid: "7bacfc3d-16ae-4e5e-8a84-b8e5e3082dc5",
        from: {hours: 12, minutes: 0, ampm: 'pm'}, 
        to: {hours: 5, minutes: 30, ampm: 'pm'}
      }
    ], 
    days: [ 3, 4 ]
  },
  { 
    time: [
      {
        uid: "8dacfc3d-16ae-4e5e-8a84-b8e5e3082dc5",
        from: {hours: 8, minutes: 0, ampm: 'am'}, 
        to: {hours: 10, minutes: 30, ampm: 'am'}
      }
    ], 
    days: [ 2, 4, 6 ]
  },
]

const clinicDataDB = {
  consultationFee: 15,
  doctorClinicUid: "83a0db30-91bf-4a51-95db-f46b487be6f9",
  intervals: [
    { 
      time: [
        {
          uid: "03d2a215-f7db-4255-8f77-25aecf546dd2",
          from: {hours: 8, minutes: 0, ampm: 'am'}, 
          to: {hours: 10, minutes: 0, ampm: 'am'}
        },
        {
          uid: "7bacfc3d-16ae-4e5e-8a84-b8e5e3082dc5",
          from: {hours: 12, minutes: 0, ampm: 'pm'}, 
          to: {hours: 5, minutes: 30, ampm: 'pm'}
        }
      ], 
      days: [ 3, 4 ]
    },
  ],
  address: {
    uid: "f8076fc0-e783-4958-861a-39ff2d6b1ad4",
    address: "Brgy. Tiza",
    city: "Roxas",
    province: "Capiz",
    country: "Philippines",
    zipCode: "5800",
    coordinates: null
  },
  minimumSchedulingNoticeMins: 1440,
  name: "Em",
  roomNumber: "",
  slotDurationInMins: 30,
  uid: "d29abd46-2403-4250-8186-a1daea58d6b3",
  __typename: "Clinic"
}

// console.log(clinicDataFromDB(clinicDataDB))
// console.log(fromDB(schedules))
// console.log(toDB(intervals))
// console.log(R.equals(fromDB(schedules), intervals))