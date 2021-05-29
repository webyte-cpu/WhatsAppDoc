import { convertTo12HrFormat, convertTo24HrFormat} from "./generateTimeSlot.js"

describe('Converts time to 12hr', () => {
  it('converts time to 12hr format obj, given 00:00', () => {
    expect(convertTo12HrFormat('00:00')).toEqual({ hours: 12, minutes: 0, ampm: 'am'})
  })

  it('converts time to 12hr format obj, given 12:00', () => {
    expect(convertTo12HrFormat('12:00')).toEqual({ hours: 12, minutes: 0, ampm: 'pm'})
  })

  it('converts time to 12hr format obj, given 13:00', () => {
    expect(convertTo12HrFormat('13:00')).toEqual({ hours: 1, minutes: 0, ampm: 'pm'})
  })
})

describe('Converts time to 24hr', () => {
  it('converts time to 24hr format obj the time at 12:00 am', () => {
    expect(convertTo24HrFormat({ hours: 12, minutes: 0, ampm: 'am'})).toEqual('00:00')
  })

  it('converts time to 24hr format obj the time at 12:00 pm', () => {
    expect(convertTo24HrFormat({ hours: 12, minutes: 0, ampm: 'pm'})).toEqual('12:00')
  })

  it('converts time to 24hr format obj the time at 1:00 pm', () => {
    expect(convertTo24HrFormat({ hours: 1, minutes: 0, ampm: 'pm'})).toEqual('13:00')
  })
})