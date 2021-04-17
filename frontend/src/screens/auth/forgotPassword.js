import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  Text,
  Input,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import customStyle from '../../../themes/styles';

const ForgotPassword = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [inputEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const sendLink = () => navigation.navigate(AppRoute.LOGIN);

  return (
    <View style={{...customStyle.content, backgroundColor: 'white'}}>
      <Input
          testID="email"
          label="Email"
          selectTextOnFocus
          placeholder="Enter email"
          value={inputEmail}
          onChangeText={setEmail}
          style={{ paddingBottom: 10 }}
        />
        <Button onPress={sendLink}>Send Link</Button>
    </View>
  );
};

export default ForgotPassword;
