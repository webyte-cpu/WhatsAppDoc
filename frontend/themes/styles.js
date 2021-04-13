import { StyleSheet } from 'react-native';

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
    paddingHorizontal: 10,
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
});

export default customStyle;
