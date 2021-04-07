import React from 'react';
import { View, Text } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';

const NotificationPage = ({navigation,fname}) => {
    return(
      <>
      <TopHeaderView navigation={navigation} hasDrawer={true} />
        <View style={{ ...customStyle.content, marginTop: 10 }}>
        <Text>NOTIFICATION</Text>
        </View>
      </>
    )}

    export default NotificationPage