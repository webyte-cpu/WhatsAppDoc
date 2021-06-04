import React from 'react';
import { Modal, Text, Button, Card } from '@ui-kitten/components';
import {View} from 'react-native';
import customStyle from '../../../../themes/styles';

const EmptyFieldsModal = ({fields, showErr, setShowErr}) => {
  const closeModal = () => setShowErr({status: false, fields: []})
  const header = (props) => (
    <View {...props}>
      <Text category='h6'>Required Fields</Text>
    </View>
  )
  const footer = (props) => (
    <View {...props}>
      <Button status="primary" onPress={() => closeModal()}>
        OK
      </Button>
    </View>
  )
  
  return (
    <Modal
      visible={showErr}
      backdropStyle={customStyle.backdrop}
      onBackdropPress={() => closeModal()}
      style={{ justifyContent: "center", alignSelf: "center" }}>
      <Card 
        style={customStyle.modalContainer}
        status='primary' 
        header={(props) => header(props)}
        footer={(props) => footer(props)}
      >
        <View style={{width: 400}}>
          <Text>{fields}</Text>
        </View>
      </Card>
    </Modal>
  )
}

export default EmptyFieldsModal;