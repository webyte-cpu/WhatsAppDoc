import React from 'react';
import { View, Text } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';

 const SchedulePage = ({navigation}) => {
    return(
      <>
      <TopHeaderView navigation={navigation} hasDrawer={true} />
        <View style={{ ...customStyle.content, marginTop: 10 }}>
          <Text>SCHEDULE</Text>
        </View>
      </>
    )
  }
  export default SchedulePage