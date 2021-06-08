
export default function getSchedule(date,time) {
    const splitTime = time.split(' ')
    const startTime = splitTime[0]
    const ampm = splitTime[splitTime.length-1]
    const schedule = `${date} ${startTime} ${ampm}`

    return schedule
}
