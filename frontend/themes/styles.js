import { StyleSheet, Platform } from 'react-native';

const customStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  contentFill: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#f9f9f9'
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
  dateCard: {
    width: 30,
    borderRadius: 70,
  },
  tabStyle: { height: 40 },
  modalContainer: {
    width: 300,
    ...Platform.select({
      web: {
        maxWidth: 600,
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
  warningCard: {
    margin: 2,
    width: 500,
  },
  agendaContainer: {
    height: 150,
    borderRadius: 15,
  },
  agendaItem: {
    color: '#FFFFFF',
  },
  agendaCardHeader: {
    flexDirection: "row", 
    justifyContent:'space-between', 
    marginHorizontal:25, 
    paddingVertical:10
  },
  clinicBtn: {
    backgroundColor: '#edf1fa', 
    paddingHorizontal: 8, 
    paddingVertical: 3,
    borderRadius: 5, 
    marginRight: 10
  },
  daysCard: {
    flex: 1,
    justifyContent: 'center',
    width: 1,
    height: 3,
    backgroundColor: '#4A40D5',
    borderRadius: 1,
  },
});

export default customStyle;
