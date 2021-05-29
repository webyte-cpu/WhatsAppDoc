import {MockedProvider } from '@apollo/client/testing'
import { getAvailableTime } from './getAvailableTime.js'

describe("get selected doctor's clinic available time", () => {

  const rawClinicData = {
    slotDurationInMins: 30,
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
        endTime: '05:30',
        doctorClinicUid: '0de7cd8a-6410-4ebb-8006-45bee76491ea',
        uid: '2eac6312-4249-4f19-8e45-ebdde07ce83f',
        days: [2,4]
      }
    ]
  }

  const appointments = [ 
    {
      appointmentUID: "ea6e4474-709f-439c-b6e2-2bb1113b45cc",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "79c1c7f3-2267-42cf-b505-cc2bf43924a3",
      createdAt: new Date("2021-05-15T04:00"),
      dateTime: new Date('2021-05-17T06:00'),
      status: "DONE"
    }, 
    {
      appointmentUID: "ea6e4474-709f-439c-b6e2-2bb1113b45cc",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "79c1c7f3-2267-42cf-b505-cc2bf43924a3",
      createdAt: new Date("2021-05-15T04:00"),
      dateTime: new Date('2021-05-17T07:00'),
      status: "ON_GOING"
    }, {
      appointmentUID: "7cadcee6-2b38-49d7-b138-8789dd1ed686",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "1543ea94-b0fa-436d-88c3-e8849246dd95",
      createdAt: new Date("2021-05-16T13:30"),
      dateTime: new Date('2021-05-17T13:30'),
      status: "PENDING"
    }, {
      appointmentUID: "b396b7e6-c972-4714-89a0-4bc6fdc887da",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "69d0c3d3-7cc2-4d3e-a58d-60033a1db51b",
      createdAt: new Date("2021-05-14T14:00"),
      dateTime: new Date('2021-05-17T14:00'),
      status: "IN_QUEUE"
    }, {
      appointmentUID: "fb7852f5-2040-4b86-8163-1a56f0aa7c77",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "69d0c3d3-7cc2-4d3e-a58d-60033a1db51b",
      createdAt: new Date("2021-05-16T11:00"),
      dateTime: new Date('2021-05-17T24:00'),
      status: "CANCELLED"
    },
    { // Wednesday 7:00 am
      appointmentUID: "ea6e4474-709f-439c-b6e2-2bb1113b45cc",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      patientUid: "79c1c7f3-2267-42cf-b505-cc2bf43924a3",
      createdAt: new Date("2021-05-15T04:00"),
      dateTime: new Date('2021-05-18T07:00'),
      status: "IN_QUEUE"
    }
  ]
  
  it('returns the available time, on user selected date: "2021-05-17 and duration = 30 mins"', () => {
    const selectedDate = new Date("2021-05-17")
    const expectedResult = [   
      {
        from: { hours: 6, minutes: 30, ampm: 'am' },
        to: { hours: 7, minutes: 0, ampm: 'am' }
      },
      {
        from: { hours: 7, minutes: 30, ampm: 'am' },
        to: { hours: 8, minutes: 0, ampm: 'am' }
      },
      {
        from: { hours: 8, minutes: 0, ampm: 'am' },
        to: { hours: 8, minutes: 30, ampm: 'am' }
      },
      {
        from: { hours: 8, minutes: 30, ampm: 'am' },
        to: { hours: 9, minutes: 0, ampm: 'am' }
      },
      {
        from: { hours: 9, minutes: 0, ampm: 'am' },
        to: { hours: 9, minutes: 30, ampm: 'am' }
      },
      {
        from: { hours: 9, minutes: 30, ampm: 'am' },
        to: { hours: 10, minutes: 0, ampm: 'am' }
      },
      {
        from: { hours: 10, minutes: 0, ampm: 'am' },
        to: { hours: 10, minutes: 30, ampm: 'am' }
      },
      {
        from: { hours: 10, minutes: 30, ampm: 'am' },
        to: { hours: 11, minutes: 0, ampm: 'am' }
      },
      {
        from: { hours: 11, minutes: 0, ampm: 'am' },
        to: { hours: 11, minutes: 30, ampm: 'am' }
      },
      {
        from: { hours: 11, minutes: 30, ampm: 'am' },
        to: { hours: 12, minutes: 0, ampm: 'pm' } // end of first time interval
      },
      {
        from: { hours: 1, minutes: 0, ampm: 'pm' },
        to: { hours: 1, minutes: 30, ampm: 'pm' }
      },
      {
        from: { hours: 2, minutes: 30, ampm: 'pm' },
        to: { hours: 3, minutes: 0, ampm: 'pm' }
      },
      {
        from: { hours: 3, minutes: 0, ampm: 'pm' },
        to: { hours: 3, minutes: 30, ampm: 'pm' }
      }
    ]

    expect(getAvailableTime(rawClinicData.intervals, rawClinicData.slotDurationInMins, appointments, selectedDate)).toEqual(expectedResult)
  })
})