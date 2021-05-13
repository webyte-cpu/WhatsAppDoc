import React, { useState } from 'react';
import { Text, Divider, Input, Button, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Platform } from 'react-native';

const plusIcon = (props) => <Icon {...props} name='plus' />;
const plusCircleIcon = (props) => <Icon {...props} style={[props.style, { width: 35, height: 35 }]} name='plus-circle' />;
const caption = (caption) => { return <Text appearance='hint' category='label' >{caption}</Text> }

const Availability = () => {
  const [scheduleSlotDuration, setScheduleSlotDuration] = useState(0);

  const SelectDate = () => {
    const [selectedIndex, setSelectedIndex] = React.useState([new IndexPath(0), new IndexPath(1)]);
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const displayValue = selectedIndex.map((index) => {
      return days[index.row]
    });

    const renderOption = (title) => <SelectItem title={title} />;

    return (
      <View style={styles.selectDay}>
        <Select
          testID='selectDays'
          multiSelect={true}
          placeholder='Days'
          value={displayValue.join(', ')}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {days.map(renderOption)}
        </Select>
      </View>
    );
  };

  const TimeInterval = () => (
    <>
      <Input testID='timeIntervalFrom' style={styles.input} label={evaProps => <Text {...evaProps}>From</Text>} />
      <Input testID='timeIntervalTo' style={styles.input} label={evaProps => <Text {...evaProps}>To</Text>} />
    </>
  );

  const IntervalForm = () => (
    <>
      <View style={styles.inputs}>
        <TimeInterval />
        <Button testID='addNewTimeInterval' appearance='ghost' accessoryLeft={plusCircleIcon}></Button>
      </View>
      <SelectDate />
    </>
  );

  const rendertimeSlotDurationBtn = (time) => (
    <Button 
      testID='timeDurationBtn'
      size='small'
      style={styles.button}
      disabled={scheduleSlotDuration === time}
      onPress={() => setScheduleSlotDuration(time)}>
      {time} mins
    </Button>
  );

  return (
    <View style={styles.container}>
      <Text category='h6'>Appointment Schedule Slot</Text>
      <View style={styles.buttons}>
        {timeSlotDuration.map(rendertimeSlotDurationBtn)}
        <Button testID='timeDurationCustom' size='small' style={styles.button} disabled={!timeSlotDuration.includes(scheduleSlot)}>
          <Input
            testID='timeDurationInput'
            caption={() => caption('*custom')}
            multiline={true}
            style={styles.customInput}
            clearTextOnFocus={true}
            onChangeText={(text) => setScheduleSlotDuration(parseInt(text))}
          />
        </Button>
      </View>
      <Divider style={{ marginTop: 20 }} />
      <Text category='h6' style={{ marginBottom: 5, marginTop: 20, }}>Intervals</Text>
      <Text appearance='hint'>Select the days and times you will accept appointments.</Text>
      <Text appearance='hint'>This intervals will repeat each week.</Text>
      <IntervalForm />
      <Button testID='addNewIntervalForm' style={{ marginVertical: 20 }} appearance='outline' accessoryLeft={plusIcon}>Add New Interval</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginHorizontal: 2,
    width: '20%',
    textAlign: 'center',
    ...Platform.select({
      web: {
        marginHorizontal: 10,
        width: '10%',
      }
    })
  },
  customInput: {
    width: '35%',
    ...Platform.select({
      web: {
        width: '50%',
      }
    })
  },
  buttons: {
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  inputs: {
    marginTop: 20,
    flexDirection: 'row',
    width: '30%'
  },
  input: {
    marginRight: 10,
  },
  selectDay: {
    marginTop: 10,
    width: '70%'
  }
})

export default Availability

