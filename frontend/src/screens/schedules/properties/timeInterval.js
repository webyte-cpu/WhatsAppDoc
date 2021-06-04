import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Select, SelectItem, useTheme, IndexPath, Text, Icon, Divider } from "@ui-kitten/components";
import { TimePicker } from "react-native-simple-time-picker";
import * as R from "ramda";

const PlusCircleBtn = ({ addNewTime, intervalIndex }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      testID="addNewTimeInterval"
      onPress={() => addNewTime(intervalIndex)}
    >
      <Icon
        fill={theme["color-primary-500"]}
        style={{ width: 30, marginBottom: 5 }}
        name="plus-circle"
      />
    </TouchableOpacity>
  );
};

const MinusCircleBtn = ({ removeTime, intervalIndex, timeIndex }) => {
  return (
    <TouchableOpacity
      testID="removeTimeInterval"
      onPress={() => removeTime(intervalIndex, timeIndex)}
    >
      <Icon
        fill={"#8f9bb3"}
        style={{ width: 30, marginBottom: 5 }}
        name="minus-circle"
      />
    </TouchableOpacity>
  );
};

const TrashBtn = ({removeInterval, intervalIndex}) => {
  if(intervalIndex === 0) {
    return <></>
  }
  
  return (<TouchableOpacity
    testID="removeDefiningTimeInterval"
    onPress={() => removeInterval(intervalIndex)}
    style={{width: 25, height: 28, flex: .1 }}
  >
    <Icon
      fill={"#8f9bb3"}
      style={{ width: 25, height: 28, marginLeft: 10 }}
      name="trash"
    />
  </TouchableOpacity>)
}

const SelectDays = ({ interval, intervalIndex, setInterval }) => {
  const [selectedDays, setSelectedDays] = useState(interval.days.map((day) => new IndexPath(day)));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const changeDays = () => {
    const intervalCopy = R.clone(interval) //deepClone
    const dayIndexes = selectedDays.map((index) => index.row);
    intervalCopy.days = dayIndexes;
    setInterval(intervalCopy, intervalIndex);
  };

  const displayValue = selectedDays.map((index) => days[index.row]);
  const renderOption = (title) => <SelectItem key={title} title={title} />;

  return (
    <View style={styles.selectDay}>
      <Select
        testID="selectDays"
        multiSelect={true}
        placeholder="Days"
        value={displayValue.join(", ")}
        selectedIndex={selectedDays}
        onSelect={(index) => setSelectedDays(index)}
        onBlur={() => changeDays()}
      >
        {days.map(renderOption)}
      </Select>
    </View>
  );
};

const IntervalButtons = (props) => {
  const { time, addNewTime, removeTime, intervalIndex, timeIndex } = props;

  return (
    <View testID="interval-buttons" style={{ flexDirection: "row", marginLeft: 3, flex: 0.1}}>
      {time.length > 1 && timeIndex !== 0 ? (
        <MinusCircleBtn removeTime={removeTime} intervalIndex={intervalIndex} timeIndex={timeIndex} />
      ) : (
        <></>
      )}
      {timeIndex === time.length - 1 ? (
        <PlusCircleBtn addNewTime={addNewTime} intervalIndex={intervalIndex} />
      ) : (
        <></>
      )}
    </View>
  );
};

const IntervalForm = ({ interval, setInterval, intervalIndex, addNewTime, removeTime, removeInterval}) => {
  
  const TimeInterval = ({ from, to, timeIndex }) => {
    const changeTime = (timeIndex, name, hours, minutes, ampm) => {
      const intervalCopy = R.clone(interval); //deepClone
      const selectedTime = intervalCopy.time[timeIndex];
      const newTime = {
        ...selectedTime,
        [name]: { hours: Number(hours), minutes: Number(minutes), ampm: ampm },
      };
      intervalCopy.time.splice(timeIndex, 1, newTime); //modify array
      setInterval(intervalCopy, intervalIndex);
    };

    return (
      <View style={styles.inputs}>
        <View style={{...styles.timeField, marginRight: 10 }}>
          <Text category="label" appearance="hint">
            From
          </Text>
             <TimePicker
              style={styles.timeInput}
              zeroPadding={true}
              testID="timeIntervalFrom"
              isAmpm={true}
              emptyLabel=''
              ampmLocalization={{am: 'AM', pm: 'PM'}}
              value={{ hours: from.hours, minutes: from.minutes, ampm: from.ampm}}
              onChange={({ hours, minutes, ampm }) => {
                changeTime(timeIndex, "from", hours, minutes, ampm);
              }}
            />
        </View>
        <View style={styles.timeField}>
          <Text category="label" appearance="hint">
            To
          </Text>
          <TimePicker
            style={styles.timeInput}
            zeroPadding={true}
            testID="timeIntervalTo"
            isAmpm={true}
            emptyLabel=''
            ampmLocalization={{am: 'AM', pm: 'PM'}}
            value={{ hours: to.hours, minutes: to.minutes, ampm: to.ampm }}
            onChange={({ hours, minutes, ampm}) => {
              changeTime(timeIndex, "to", hours, minutes, ampm);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {interval.time.map(({ from, to }, timeIndex) => (
        <View
          style={{flexDirection: "row", alignItems: "flex-end", flexWrap: 'wrap', maxWidth: 415  }}
          key={`time-${intervalIndex}-${timeIndex}`}
        >
          <View>
            <TimeInterval from={from} to={to} timeIndex={timeIndex} />
          </View>
          <IntervalButtons
            time={interval.time}
            addNewTime={addNewTime}
            removeTime={removeTime}
            intervalIndex={intervalIndex}
            timeIndex={timeIndex}
          />
        </View>
      ))}
      <View style={{alignItems: 'center', flexDirection: 'row', maxWidth: 412}}>
        <SelectDays
          key={`day-${intervalIndex}`}
          interval={interval}
          intervalIndex={intervalIndex}
          setInterval={setInterval}
        />
        <TrashBtn removeInterval={removeInterval} intervalIndex={intervalIndex}/>
      </View>
      <Divider style={{ marginTop: 20, maxWidth: 350 }} />
    </>
  );
};

const styles = StyleSheet.create({
  timeField: {
    flexDirection: "column",
    // flex: 0.5
  },
  timeInput: {
    backgroundColor: "#f7f9fc",
    borderColor: "#e4e9f2",
    borderRadius: 4,
    padding: 8,
    marginRight: 5,
    width: 60,
    fontFamily: "Poppins-Regular",
  },
  inputs: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: 'wrap',
    // width: "30%",
    // alignItems: "flex-end",
    // alignSelf: 'center',
    // alignContent: 'bottom'
  },
  selectDay: {
    marginTop: 10,
    flex: .9
  },
});

export default IntervalForm;
