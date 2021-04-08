import React from 'react'
import { Icon, useTheme } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';

// drawer button with toggle function
const DrawerMenuBtn = (props)=> {
  const theme = useTheme();
  
  const toggleDrawer = () => {
    props.navigationProps.openDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableWithoutFeedback onPress={()=> alert('open drawer')}>
        <Icon name='menu' fill={theme['color-primary-dark']} style={{width: 25, height: 25 }}/>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default DrawerMenuBtn;