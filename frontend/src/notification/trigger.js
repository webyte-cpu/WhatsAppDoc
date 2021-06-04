
export default function getTrigger(scheduledDate){
    const currentDate = new Date()
    const schedule = new Date(scheduledDate) 
    const difference = schedule - currentDate
    const seconds = difference/1000
    const oneHourAllowance = 3600
    let trigger = seconds
  
    if(trigger > oneHourAllowance){
      trigger = seconds - oneHourAllowance
    }
  
    return trigger
  }