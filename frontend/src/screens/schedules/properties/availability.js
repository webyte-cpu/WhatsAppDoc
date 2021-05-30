import React, { useState } from "react";
import { Text, Divider, Input, Button, Icon } from "@ui-kitten/components";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { usePropertiesForm } from "./formProvider";
import * as R from "ramda";
import IntervalForm from "./timeInterval";

// ELEMENTS
const plusIcon = (props) => <Icon {...props} name="plus-outline" />;
const caption = (caption) => {
  return (
    <Text appearance="hint" category="label">
      {caption}
    </Text>
  );
};


const Availability = ({ navigation, route }) => {
  const form = usePropertiesForm();
  const { initialValues } = form
  const defaultTime = {
    from: { hours: '', minutes: '', ampm: 'am' },
    to: { hours: '', minutes: '', ampm: 'am'},
  };

  const defaultInterval = {
    time: [defaultTime],
    days: []
  }
  
  const [scheduleSlotDuration, setScheduleSlotDuration] = useState(initialValues.scheduleSlotDuration);
  const [intervals, setIntervals] = useState(R.isEmpty(initialValues.intervals) ? [defaultInterval] : initialValues.intervals );
  const timeSlotDuration = [15, 30, 45, 60];

  const editScheduleSlotDuration = (time) => {
    const scheduleSlotDuration = Number(time)
    setScheduleSlotDuration(scheduleSlotDuration)
    form.setValues({scheduleSlotDuration})
  }

  const editIntervals = (intervals, toDelete) => {
    setIntervals(intervals);
    let newData = {intervals}

    if(toDelete != undefined) {
      newData = {...newData, intervalsToDelete: toDelete}
    }

    form.setValues(newData)
  }

  const removeInterval = (intervalIndex) => {
    const copy = R.clone(intervals);
    const removeTimes = copy[intervalIndex].time.map((time) => time)

    copy.splice(intervalIndex, 1)
    editIntervals(copy, removeTimes);
  }

  const removeTime = (intervalIndex, timeIndex) => {
    const copy = R.clone(intervals);
    const removedTime = copy[intervalIndex].time.splice(timeIndex, 1)
    editIntervals(copy, removedTime);
  };

  const addNewTime = (intervalIndex) => {
    const copy = R.clone(intervals);
    copy[intervalIndex].time.push(defaultTime);
    editIntervals(copy);
  };

  function addNewInterval () {
    const copy = R.clone(intervals);
    copy.push({ ...defaultInterval });
    editIntervals(copy);
  };

  const setInterval = (data, intervalIndex) => {
    const copy = R.clone(intervals);
    copy[intervalIndex] = data;
    editIntervals(copy);
  };

  const rendertimeSlotDurationBtn = (time) => (
    <Button
      key={`${time}-mins`}
      testID="timeDurationBtn"
      style={styles.button}
      disabled={scheduleSlotDuration === time}
      onPress={() => editScheduleSlotDuration(time)}
    >
      {time} mins
    </Button>
  );

  return (
    <ScrollView style={styles.container}>
      <Text category="h6">Appointment Schedule Slot</Text>
      <View style={styles.buttons}>
        {timeSlotDuration.map(rendertimeSlotDurationBtn)}
        <Button
          testID="timeDurationCustom"
          size="small"
          style={styles.button}
          disabled={!timeSlotDuration.includes(scheduleSlotDuration)}
        >
          <Input
            value={
              !timeSlotDuration.includes(scheduleSlotDuration)
                ? scheduleSlotDuration
                : ""
            }
            testID="timeDurationInput"
            caption={() => caption("*custom")}
            multiline={true}
            style={styles.customInput}
            clearTextOnFocus={true}
            onBlur={() => form.setValues({scheduleSlotDuration})}
            onChangeText={(time) => editScheduleSlotDuration(time)}
            keyboardType='numeric'
            maxLength={3}
          />
        </Button>
      </View>
      <Divider style={{ marginTop: 20 }} />
      <Text category="h6" style={{ marginBottom: 5, marginTop: 20 }}>
        Intervals
      </Text>
      <Text appearance="hint">
        Select the days and times you will accept appointments.
      </Text>
      <Text appearance="hint">This intervals will repeat each week.</Text>
      {intervals.map((interval, intervalIndex) => {
        return (
          <IntervalForm
            key={`interval-${intervalIndex}`}
            interval={interval}
            intervalIndex={intervalIndex}
            setInterval={setInterval}
            addNewTime={addNewTime}
            removeTime={removeTime}
            removeInterval={removeInterval}
          />
        );
      })}
      <Button
        testID="addNewIntervalForm"
        style={{ marginVertical: 20, maxWidth: 300 }}
        appearance="outline"
        accessoryLeft={plusIcon}
        onPress={() => addNewInterval()}
      >
        Add New Interval
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  button: {
    margin: 4,
    width: 90,
    height: 60,
    // width: "20%",
    textAlign: "center",
    // ...Platform.select({
    //   web: {
    //     marginHorizontal: 10,
    //     // width: "10%",
    //   },
    // }),
  },
  customInput: {
    width: 60,
    // ...Platform.select({
    //   web: {
    //     width: "50%",
    //   },
    // }),
  },
  buttons: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    // justifyContent: 'center',
  },
});

export default Availability;
