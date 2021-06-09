import * as R from "ramda";
import { intervalsFromDB } from "./convertData.js";

// const R = require('ramda')
const dummyClinicData = {
  // from DB
  slotDuration: 30,
  intervals: [
    {
      startTime: "06:00",
      endTime: "12:00",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      uid: "f501dd6e-3048-41dc-9bc5-7f2233acdb7f",
      days: [1, 3, 5],
    },
    {
      startTime: "13:00",
      endTime: "15:30",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      uid: "f501dd6e-3048-41dc-9bc5-7f2233acdb7f",
      days: [1, 3, 5],
    },
    {
      startTime: "00:00",
      endTime: "05:30",
      doctorClinicUid: "0de7cd8a-6410-4ebb-8006-45bee76491ea",
      uid: "2eac6312-4249-4f19-8e45-ebdde07ce83f",
      days: [2, 4],
    },
  ],
};

export const formatNum = (num) => num.toString().padStart(2, 0);

export function splitHrsAndMins(time) {
  let splitTime = time.split(":");
  let minutes = parseInt(splitTime[1]);
  let hours = parseInt(splitTime[0]);
  return { hours: hours, minutes: minutes };
}

export const convertTo12HrFormat = (timeTobeConverted) => {
  let { hours, minutes } = splitHrsAndMins(timeTobeConverted);
  let ampm = "am";

  if (hours >= 12) {
    hours -= 12;
    ampm = "pm";

    if (hours === 0) {
      hours = 12;
    }
  } else if (hours === 0) {
    hours = 12;
  }

  const convertedTime = { hours, minutes, ampm };
  return convertedTime;
};

export const convertTo24HrFormat = (timeObj) => {
  let { hours, minutes, ampm } = timeObj;

  if (hours < 12 && ampm === "pm") {
    hours += 12;
  } else if (hours === 12 && ampm === "am") {
    hours = 0;
  }

  const timeToString24HrFormat = `${formatNum(hours)}:${formatNum(minutes)}`;
  return timeToString24HrFormat;
};

export const addTimeDuration = (time, slotDurationInMins) => {
  let splitTime = splitHrsAndMins(time);
  const additionalTime = slotDurationInMins / 60
  const additionalHours = Math.trunc(additionalTime)
  const additionalMinutes = Math.trunc(60 * (additionalTime - additionalHours))

  let hours = splitTime.hours + additionalHours
  let minutes = splitTime.minutes + additionalMinutes

  if (minutes >= 60) {
    hours++
    minutes -= 60;
  }

  if (hours === 24) {
    hours = 0;
  }

  const convertedTo12HrFormat = convertTo12HrFormat(`${hours}:${minutes}`);
  const currentHrs = convertedTo12HrFormat.hours;
  const currentMinutes = convertedTo12HrFormat.minutes;
  const currentPeriod = convertedTo12HrFormat.ampm;

  let timeObj = {
    hours: currentHrs,
    minutes: currentMinutes,
    ampm: currentPeriod,
  };
  timeObj.timeToString24HrFormat = convertTo24HrFormat(timeObj);
  return timeObj;
};

export const checkTimeSlot = (currentTime, endTime) => {
  const currentTimeSplit = splitHrsAndMins(currentTime);
  const currentMins = currentTimeSplit.minutes;
  const currentHrs = currentTimeSplit.hours;
  const endTimeSplit = splitHrsAndMins(endTime);
  const endMins = endTimeSplit.minutes;
  const endHrs = endTimeSplit.hours;
  let time = { closingTime: false, availTimeSlot: true };

  if (currentHrs === endHrs) {
    if (currentMins > endMins) {
      time.closingTime = true;
      time.availTimeSlot = false;
    } else if (currentMins === endMins) {
      time.closingTime = true;
      time.availTimeSlot = true;
    }
  } else if (currentHrs > endHrs && endHrs != 0) {
    time.closingTime = true;
    time.availTimeSlot = false;
  }
  return time;
};

export const generateTimeSlot = (intervals, slotDurationInMins) => {
  let timeArr = [];

  intervals.map((time) => {
    const endTime = time.endTime;
    let currentTime = time.startTime;

    while (true) {
      let beforeTime = convertTo12HrFormat(currentTime); //from
      let addedTime = addTimeDuration(currentTime, slotDurationInMins); //to
      let checkTime = checkTimeSlot(addedTime.timeToString24HrFormat, endTime); //check if time slot is avail and nd lapaw sa end time

      if (checkTime.closingTime === false && checkTime.availTimeSlot === true) {
        timeArr.push({
          from: {
            hours: beforeTime.hours,
            minutes: beforeTime.minutes,
            ampm: beforeTime.ampm,
          },
          to: {
            hours: addedTime.hours,
            minutes: addedTime.minutes,
            ampm: addedTime.ampm,
          },
          ...time,
        });
        currentTime = addedTime.timeToString24HrFormat;
      } else if (
        checkTime.closingTime === true &&
        checkTime.availTimeSlot === true
      ) {
        timeArr.push({
          from: {
            hours: beforeTime.hours,
            minutes: beforeTime.minutes,
            ampm: beforeTime.ampm,
          },
          to: {
            hours: addedTime.hours,
            minutes: addedTime.minutes,
            ampm: addedTime.ampm,
          },
          ...time,
        });
        return;
      } else if (
        checkTime.closingTime === true &&
        checkTime.availTimeSlot === false
      ) {
        return;
      }
    }
  });

  return timeArr;
};

export const getTimeForDisplay = (intervals, slotDurationInMins) => {
  const generated = generateTimeSlot(intervals, slotDurationInMins);
  const strippedData = intervalsFromDB(generated).map((interval) => {
    const time = interval.time.map((time) =>
      R.omit(["doctorClinicUid", "uid"], time)
    );
    return { ...interval, time };
  });

  return strippedData;
};

// console.log(addTimeDuration({ hours: 7, minutes: 0, ampm: 'am'}, 30))
// console.log(checkTimeSlot(addTimeDuration({ hours: 7, minutes: 0, ampm: 'am'}, 30), { hours: 10, minutes: 0, ampm: 'am'}))
// console.log(generateTimeSlot(dummyClinicData.intervals, dummyClinicData.slotDuration))
// console.log(convertTo24HrFormat({hours: 1, minutes: 2, ampm: 'pm'}))
// console.log(getTimeForDisplay(dummyClinicData.intervals, dummyClinicData.slotDuration).flatMap((d) => d ))
