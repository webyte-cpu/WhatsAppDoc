import React, { useState } from 'react';
import { Text, Divider, Input, Button, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Platform } from 'react-native';

const plusIcon = (props) => <Icon {...props} name='plus' />;
const plusCircleIcon = (props) => <Icon {...props} style={[props.style, { width: 35, height: 35 }]} name='plus-circle' />;
const caption = (caption) => { return <Text appearance='hint' category='label' >{caption}</Text> }

const SelectDate = () => {
  const [selectedIndex, setSelectedIndex] = React.useState([new IndexPath(0), new IndexPath(1)]);
  const data = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const displayValue = selectedIndex.map( (index) => {
    return data[index.row]
  });

  const renderOption = (title) => <SelectItem title={title} />;

  return (
    <View style={styles.selectDay}>
      <Select
        multiSelect={true}
        placeholder='Days'
        value={displayValue.join(', ')}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {data.map(renderOption)}
      </Select>
    </View>
  );
};


const Availability = () => {
  const [scheduleSlot, setScheduleSlot] = useState(0);
  const timeSlot = [15, 30, 45, 60];

  const TimeInterval = () => (
    <View style={styles.inputs}>
      <Input style={styles.input} label={evaProps => <Text {...evaProps}>From</Text>} />
      <Input style={styles.input} label={evaProps => <Text {...evaProps}>To</Text>} />
      <Button size='large' appearance='ghost' accessoryLeft={plusCircleIcon}></Button>
    </View>
  )

  const IntervalForm = () => (
    <>
      <TimeInterval />
      <SelectDate />
    </>
  )
  
  return (
    <View style={styles.container}>
      <Text category='h6'>Appointment Schedule Slot</Text>
      <View style={styles.buttons}>
        <Button size='small' style={styles.button} disabled={scheduleSlot === 15} onPress={() => setScheduleSlot(15)}>15 mins</Button>
        <Button size='small' style={styles.button} disabled={scheduleSlot === 30} onPress={() => setScheduleSlot(30)}>30 mins</Button>
        <Button size='small' style={styles.button} disabled={scheduleSlot === 45} onPress={() => setScheduleSlot(45)}>45 mins</Button>
        <Button size='small' style={styles.button} disabled={scheduleSlot === 60} onPress={() => setScheduleSlot(60)}>60 mins</Button>
        <Button size='small' style={styles.button} disabled={!timeSlot.includes(scheduleSlot)}>
          <Input
            caption={() => caption('*custom')}
            multiline={true}
            style={styles.customInput}
            clearTextOnFocus={true}
            onChangeText={(text) => setScheduleSlot(parseInt(text))}
          />
        </Button>
      </View>
      <Divider style={{ marginTop: 20 }} />
      <Text category='h6' style={{ marginBottom: 5, marginTop: 20, }}>Intervals</Text>
      <Text appearance='hint'>Select the days and times you will accept appointments.</Text>
      <Text appearance='hint'>This intervals will repeat each week.</Text>
      <IntervalForm />
      <Button style={{ marginVertical: 20 }} appearance='outline' accessoryLeft={plusIcon}>Add New Interval</Button>
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
      web:{
        marginHorizontal: 10,
        width: '10%',
      }
    })
  },
  customInput:{
    width: '35%',
    ...Platform.select({
      web:{
        width: '50%',
      }
    })
  },
  buttons: {
    marginVertical:10,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  inputs: {
    marginTop: 20,
    flexDirection: 'row',
    width:'30%'
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

