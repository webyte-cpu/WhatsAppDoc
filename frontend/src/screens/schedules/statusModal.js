import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Button, Card, Text } from "@ui-kitten/components";
import { GET_ALL_APPOINTMENT, UPDATE_APPOINTMENT_MUTATION } from "./utils/queries";
import { useMutation } from "@apollo/client";

const StatusModal = ({ isShown, onHide, selectedItem }) => {
  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION, {
    onCompleted: () => {
      onHide();
    },
    onError: (err) => {
      console.error(err);
    },
    refetchQueries: [{ query: GET_ALL_APPOINTMENT }],
  });

  const updateAppointmentStatus = (uidCode, status) => {
    updateAppointment({
      variables: {
        uid: uidCode,
        status: status,
      },
    });
  };

  const Footer = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button onPress={onHide}>Cancel</Button>
        <Button
          status="success"
          onPress={() => {
            updateAppointmentStatus(
              selectedItem.uid,
              selectedItem.status.replace(" ", "_")
            );
          }}
        >
          Yes
        </Button>
      </View>
    );
  };

  return (
    <View>
      <Modal
        visible={isShown}
        backdropStyle={styles.backdrop}
        onBackdropPress={onHide}
      >
        <Card
          style={{ width: 250 }}
          disabled={true}
          header={(props) => <Text {...props}>Change status</Text>}
          footer={() => <Footer />}
        >
          <View style={styles.container}>
            <Text>Confirm status change?</Text>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  text: {
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
});

export default StatusModal;
