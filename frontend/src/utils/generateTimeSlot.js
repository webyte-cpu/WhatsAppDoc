const dummyData = [
    { startTime: '7:30', endTime: '12:00', slotDurationInMins: 30 },
    { startTime: '13:00', endTime: '15:30', slotDurationInMins: 40 },
    { startTime: '23:40', endTime: '0:00', slotDurationInMins: 10 },
    { startTime: '00:15', endTime: '1:00', slotDurationInMins: 25 },
]

export const formatNum = (num) => num.toString().padStart(2,0)

export function splitHrsAndMins(time) {
    let splitTime = time.split(':')
    let minutes = parseInt(splitTime[1])
    let hours = parseInt(splitTime[0])
    return { hours: hours, minutes: minutes }
}

export const convertTo12HrFormat = (timeTobeConverted) => {
    let { hours, minutes } = splitHrsAndMins(timeTobeConverted)
    let ampm = 'am';

    if (hours >= 12) {
        hours -= 12
        ampm = 'pm'

        if (hours === 0) {
            hours = 12
        }

    } else if (hours === 0) {
        hours = 12
    }

    const convertedTime = { hours, minutes, ampm }
    return convertedTime
}

export const convertTo24HrFormat = (timeObj) => {
    let {hours, minutes, ampm} = timeObj

    if (hours < 12 && ampm === 'pm') {
        hours += 12
    } else if (hours === 12 && ampm === 'am') {
        hours = 0
    }

    const timeToString24HrFormat = `${formatNum(hours)}:${formatNum(minutes)}`
    return timeToString24HrFormat
}


export const addTimeDuration = (time, slotDurationInMins) => {
    let splitTime = splitHrsAndMins(time)
    let minutes = splitTime.minutes + slotDurationInMins
    let hours = splitTime.hours

    if (minutes >= 60) {
        hours++
        minutes -= 60
    }

    if (hours === 24) {
        hours = 0
    }

    const convertedTo12HrFormat = convertTo12HrFormat(`${hours}:${minutes}`)
    const currentHrs = convertedTo12HrFormat.hours
    const currentMinutes = convertedTo12HrFormat.minutes
    const currentPeriod = convertedTo12HrFormat.ampm

    let timeObj = { hours: currentHrs, minutes: currentMinutes, ampm: currentPeriod }
    timeObj.timeToString24HrFormat = convertTo24HrFormat(timeObj)
    return timeObj
}

export const checkTimeSlot = (currentTime, endTime) => {
    const currentTimeSplit = splitHrsAndMins(currentTime)
    const currentMins = currentTimeSplit.minutes
    const currentHrs = currentTimeSplit.hours
    const endTimeSplit = splitHrsAndMins(endTime)
    const endMins = endTimeSplit.minutes
    const endHrs = endTimeSplit.hours
    let time = { closingTime: false, availTimeSlot: true }

    if (currentHrs === endHrs) {
        if (currentMins > endMins) {
            time.closingTime = true
            time.availTimeSlot = false
        } else if (currentMins === endMins) {
            time.closingTime = true
            time.availTimeSlot = true
        }
    } else if (currentHrs > endHrs && endHrs != 0) {
        time.closingTime = true
        time.availTimeSlot = false
    }
    return time
}

export const generateTimeSlot = (data) => {
    let timeArr = []

    data.map((time) => {
        const duration = time.slotDurationInMins
        const endTime = time.endTime
        let currentTime = time.startTime

        while (true) {
            let beforeTime = convertTo12HrFormat(currentTime) //from 
            let addedTime = addTimeDuration(currentTime, duration) //to
            let checkTime = checkTimeSlot(addedTime.timeToString24HrFormat, endTime) //check if time slot is avail and nd lapaw sa end time

            if (checkTime.closingTime === false && checkTime.availTimeSlot === true) {
                timeArr.push({
                    from: { hours: beforeTime.hours, minutes: beforeTime.minutes, ampm: beforeTime.ampm },
                    to: { hours: addedTime.hours, minutes: addedTime.minutes, ampm: addedTime.ampm }
                })
                currentTime = addedTime.timeToString24HrFormat
            } else if (checkTime.closingTime === true && checkTime.availTimeSlot === true) {
                timeArr.push({
                    from: { hours: beforeTime.hours, minutes: beforeTime.minutes, ampm: beforeTime.ampm },
                    to: { hours: addedTime.hours, minutes: addedTime.minutes, ampm: addedTime.ampm }
                })
                return
            } else if (checkTime.closingTime === true && checkTime.availTimeSlot === false) {
                return
            }
        }
    })
    return timeArr
}
// console.log(generateTimeSlot(dummyData))
// console.log(convertTo24HrFormat({hours: 1, minutes: 2, ampm: 'pm'}))