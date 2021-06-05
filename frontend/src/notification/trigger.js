
export default function getTrigger(scheduledDate){
    const currentDate = new Date() //date and time the doctor accepts booking request
    const schedule = new Date(scheduledDate) 
    const difference = schedule - currentDate //gets milliseconds
    const seconds = difference/1000
    const oneHourAllowance = 3600
    const trigger = seconds - oneHourAllowance //triggers an hour before scheduled appointment

    return trigger
  }