import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const customStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  contentFill: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  headerStyle: {
    backgroundColor: "#f9f9f9",
  },
  uploadImgContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  formTitle: {
    marginBottom: 20,
    marginTop: 50,
  },
  tabStyle: { height: 40 },
  modalContainer: {
    width: 300,
    ...Platform.select({
      web: {
        width: 600,
      },
    }),
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  listBackground: {
    backgroundColor: "white"
  },
  button: {
    marginHorizontal: 2
  },
  buttonGroup: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default customStyle;
