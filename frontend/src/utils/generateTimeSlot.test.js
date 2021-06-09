import { generateTimeSlot } from "./generateTimeSlot"

const intervals = [
  {
    startTime: "06:00",
    endTime: "12:00",
  },
  {
    startTime: "13:00",
    endTime: "15:30",
  },
	]


describe('generate time slots',() => {
  it('returns time slot with slot duration > 59 minutes', () => {
    const slotDuration = 120
    const expectedTimes =  [
      {
        from: { hours: 6, minutes: 0, ampm: 'am' },
        to: { hours: 8, minutes: 0, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },   
      {
        from: { hours: 8, minutes: 0, ampm: 'am' },
        to: { hours: 10, minutes: 0, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 10, minutes: 0, ampm: 'am',},
        to: { hours: 12, minutes: 0, ampm: 'pm' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 1, minutes: 0, ampm: 'pm' },
        to: { hours: 3, minutes: 0, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
    ]
    expect(generateTimeSlot(intervals, slotDuration)).toEqual(expectedTimes)
  })

  it('returns time slot with slot duration < 60 minutes', () => {
    const slotDuration = 25
    const expectedTimes = [
      {
        from: { hours: 6, minutes: 0, ampm: 'am' },
        to: { hours: 6, minutes: 25, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 6, minutes: 25, ampm: 'am' },
        to: { hours: 6, minutes: 50, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 6, minutes: 50, ampm: 'am' },
        to: { hours: 7, minutes: 15, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 7, minutes: 15, ampm: 'am' },
        to: { hours: 7, minutes: 40, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 7, minutes: 40, ampm: 'am' },
        to: { hours: 8, minutes: 5, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 8, minutes: 5, ampm: 'am' },
        to: { hours: 8, minutes: 30, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 8, minutes: 30, ampm: 'am' },
        to: { hours: 8, minutes: 55, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 8, minutes: 55, ampm: 'am' },
        to: { hours: 9, minutes: 20, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 9, minutes: 20, ampm: 'am' },
        to: { hours: 9, minutes: 45, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 9, minutes: 45, ampm: 'am' },
        to: { hours: 10, minutes: 10, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 10, minutes: 10, ampm: 'am' },
        to: { hours: 10, minutes: 35, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 10, minutes: 35, ampm: 'am' },
        to: { hours: 11, minutes: 0, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 11, minutes: 0, ampm: 'am' },
        to: { hours: 11, minutes: 25, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 11, minutes: 25, ampm: 'am' },
        to: { hours: 11, minutes: 50, ampm: 'am' },
        startTime: "06:00",
        endTime: "12:00",
      },
      {
        from: { hours: 1, minutes: 0, ampm: 'pm' },
        to: { hours: 1, minutes: 25, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
      {
        from: { hours: 1, minutes: 25, ampm: 'pm' },
        to: { hours: 1, minutes: 50, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
      {
        from: { hours: 1, minutes: 50, ampm: 'pm' },
        to: { hours: 2, minutes: 15, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
      {
        from: { hours: 2, minutes: 15, ampm: 'pm' },
        to: { hours: 2, minutes: 40, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
      {
        from: { hours: 2, minutes: 40, ampm: 'pm' },
        to: { hours: 3, minutes: 5, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      },
      {
        from: { hours: 3, minutes: 5, ampm: 'pm' },
        to: { hours: 3, minutes: 30, ampm: 'pm' },
        startTime: "13:00",
        endTime: "15:30",
      }
    ]

    expect(generateTimeSlot(intervals, slotDuration)).toEqual(expectedTimes)
  })
})