
export default function getStartTime(time) {
    const splitTime = time.split(' ')
    const startTime = splitTime[0]
    const ampm = splitTime[splitTime.length-1]
    const scheduleTime = `${startTime} ${ampm}`

    return scheduleTime
}
