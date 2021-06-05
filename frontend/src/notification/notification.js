
import * as Notifications from 'expo-notifications';
import getTrigger from './trigger';

function getNotification(user, pushToken, clinic,schedule,type){
  let content = {recipient:pushToken};

  switch(type){
    case 'verifyLicense' : 
      content.title = 'Confirmed Verification'
      content.body = 'Your verification has been approved. Your verification is effective until your license will be expired.'
      // content.screen = 'Profile'
      schedulePushNotification(user,clinic,schedule)
      break;
    case 'denyLicense' :
      content.title = 'Rejected Verification'
      content.body =  'Your verification has been rejected. Please submit a valid license card info.'
      content.screen = 'DoctorForm'
      break;
    case 'confirmAppointment':
      content.title = 'Confirmed Booking Appointment'
      content.body = `${user} confirmed your booking at ${clinic} on ${schedule}.`
      content.screen = 'Schedule'
      break;
    case 'cancelAppointment':
      content.title = 'Cancelled Booking Appointment'
      content.body = `${user} cancelled your booking at ${clinic} on ${schedule}.`
      content.screen = 'Request'
      break;
    case 'requestAppointment':
      content.title = 'Requesting Booking Appointment'
      content.body = `${user} requested an appointment at ${clinic} on ${schedule}`
      content.screen = 'Request'
 
      break;
  }
  sendPushNotification(content)
}

//send notif to user(doctor/patient)
async function sendPushNotification(content) {
  const recipient = content.recipient
  const title = content.title
  const body = content.body
  const screen = content.screen

  const message = {
    to: recipient,
    sound: 'default',
    title: title,
    body: body,
    data: {navigate:screen}
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

//booking → notify self/reminder
async function schedulePushNotification( doctor, clinic, schedule ) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Appointment in an hour!',
      body: `You have an appointment with Doctor ${doctor} at ${clinic} on ${schedule}`,
      data: {navigate:'Schedule'}
    },
    trigger: {seconds: getTrigger(schedule)}, //is triggered an hour before the scheduled appointment
  });
}

//get pushToken
async function registerForPushNotificationsAsync() {
  let token;

    //check for existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    //if no existing permission, ask user for permission
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    //if no permission, exit function
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    //getExpoPushTokenAsync is used with Expo's push notification service, for other push services like APNS and FCM, use getDevicePushTokenAsync()
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return token;
}

export {getNotification, registerForPushNotificationsAsync}