import React, { useState, useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { navigate } from '../navigation/rootNavigation'
import {AppRoute} from '../navigation/app-routes'
import getTrigger from './trigger';

//using this function you can set a callback that will decide whether the notification should be shown to the user or not
//set the handler that will cause the notification to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function useNotifications(){
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    //Listeners registered by this method will be called whenever a notification is received while the app is running.
    notificationListener.current = Notifications.addNotificationReceivedListener( notification => {
      const data = notification.request.content.data
        if(notification.request.content.title === 'Confirmed Booking Appointment'){
          schedulePushNotification(data.user, data.schedule, data.clinic, data.navigate)
        }
    });
    
    //Listeners registered by this method will be called whenever a user interacts with a notification (eg. taps on it).
    responseListener.current = Notifications.addNotificationResponseReceivedListener( response => {
      const screen = response.notification.request.content.data.navigate
      console.log('navigate to:', screen)
      navigate(screen)
    });

    return () => {
      // Clean up the event listeners
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
}

function pushNotification( user, pushToken, clinic, schedule, type ){
  const doctor = user.doctor
  const patient = user.patient
  let content = { recipient:pushToken, clinic:clinic, schedule:schedule };

  switch(type){
    case 'verifyLicense' : 
      content.title = 'Confirmed Verification'
      content.body = 'Your verification has been approved. Your verification is effective until your license will be expired.'
      break;
    case 'denyLicense' :
      content.title = 'Rejected Verification'
      content.body =  'Your verification has been rejected. Please submit a valid license card info.'
      content.screen = AppRoute.DOCTOR_FORM
      break;
    case 'confirmAppointment':
      content.title = 'Confirmed Booking Appointment'
      content.body = `${doctor} confirmed your booking at ${clinic} on ${schedule}.`
      content.user = doctor
      content.screen = AppRoute.SCHEDULE
      schedulePushNotification(patient,clinic,schedule,AppRoute.SCHEDULE)
      break;
    case 'cancelAppointment':
      content.title = 'Cancelled Booking Appointment'
      content.body = `${doctor?doctor:patient} cancelled the appointment at ${clinic} on ${schedule}.`
      content.screen = AppRoute.REQUEST
      break;
    case 'requestAppointment':
      content.title = 'Requesting Booking Appointment'
      content.body = `${patient} requested an appointment at ${clinic} on ${schedule}`
     content.screen = AppRoute.REQUEST
      break;
  }
  return sendPushNotification(content)
}

//send notif to user(doctor/patient)
async function sendPushNotification(content) {
  const recipient = content.recipient
  const title = content.title
  const body = content.body
  const screen = content.screen
  const user = content.user
  const clinic = content.clinic
  const schedule = content.schedule

  const message = {
    to: recipient,
    sound: 'default',
    title: title,
    body: body,
    data: { user:user, clinic:clinic, schedule:schedule, navigate:screen },
    priority:'high'
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
async function schedulePushNotification( user, clinic, schedule, screen ) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Appointment in an hour!',
      body: `You have an appointment with ${user} at ${clinic} on ${schedule}`,
      data: {navigate:screen}
    },
    trigger: {seconds:5}, 
    // trigger: {seconds:getTrigger(schedule)}, is triggered an hour before the scheduled appointment
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

    //if no permission, return null
    if (finalStatus !== 'granted') {
      token = null
    }else{
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    console.log(token);
    return token;
}


export {useNotifications, pushNotification, registerForPushNotificationsAsync}