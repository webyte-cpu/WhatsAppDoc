import { ListItem, Text, Layout, Spinner } from "@ui-kitten/components";
import { GET_NOTIFICATIONS } from "../../queries";
import customStyle from "../../../themes/styles";
import { View, StyleSheet } from "react-native";
import { useSubscription } from "@apollo/client";
import moment from "moment";
import React from "react";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const NotificationList = ({ data }) => {
  return (
    <ListItem
      title={(evaProps) => <Text {...evaProps}>{data.title}</Text>}
      description={(evaProps) => (
        <Layout style={styles.container}>
          <Text {...evaProps}>{data.description}</Text>
          <Text {...evaProps}>{moment(data.createdAt).calendar()}</Text>
        </Layout>
      )}
    />
  );
};

const NotificationPage = ({ navigation }) => {
  const { data, loading } = useSubscription(GET_NOTIFICATIONS);
  return (
    <View style={customStyle.content}>
      <Text>NOTIFICATIONS</Text>
      {loading ? (
        <Layout style={styles.layout}>
          <Spinner size="giant" />
        </Layout>
      ) : (
        data.newNotification.map((data, key) => (
          <NotificationList key={key} data={data} />
        ))
      )}
    </View>
  );
};

export default NotificationPage;
