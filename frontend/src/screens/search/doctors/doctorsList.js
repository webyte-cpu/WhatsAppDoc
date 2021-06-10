import React from "react";
import { View, FlatList } from "react-native";
import {
  Text,
  Icon,
  Divider,
  ListItem,
} from "@ui-kitten/components";
import customStyle from "../../../../themes/styles";
import ProfileIcon from "../../../components/profileIcon";
import EmptyListText from "../../../components/emptyListText";
import { AppRoute } from "../../../navigation/app-routes";
// import BookingScreen from "../../booking/bookAppointment";
// import StarRatingComponent from "react-star-rating-component";
// import Ratings from './doctorRatings'


// const bookmarkIcon = (props) => <Icon {...props} style={[props.style, {width:30, height:30}]} name='bookmark-outline' />
const ExperienceIcon = (props) => (
  <Icon
    style={{ width: 20, height: 20 }}
    fill="#8f9bb3"
    name="briefcase-outline"
  />
);

const RenderClinicNames = ({clinics, doctorUid}) => {
  const names = clinics.map((clinic) => clinic.name)

  const clinicNames = ({ item: clinicName, index }) => (  
    <View style={customStyle.clinicBtn}>
      <Text category="s2" status="primary">{clinicName}</Text>
    </View>
    )
  
  return (
    <FlatList
      horizontal="true"
      data={names}
      renderItem={clinicNames} 
      style={{marginLeft: 10, marginBottom: 10}}
    />
  )
}
const RenderDescription = ({ specialization, experience }) => {
  return (
    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
      <Text category="s1" style={{color: '#8f9bb3'}}>{specialization.join(', ')} </Text>
      {/* <Ratings rating={item.rating}/> */}
      <View style={{ flexDirection: "row", marginTop: 8, alignContent: 'center'}}>
        <ExperienceIcon />
        <Text category="p2" appearance="hint"> {experience} Years of Experience</Text>
      </View>
    </View>
  );
};

const RenderDoctor = ({ item: doctor, navigation, disable = false}) => {
  return (
    <ListItem
      testID={`doctor-${doctor.uid}`}
      title={() => <Text category="h6" style={{marginLeft: 7}}>{`${doctor.firstName} ${doctor.middleName[0].toUpperCase()}. ${doctor.lastName}`}</Text>}
      accessoryLeft={() => (
        <ProfileIcon firstName={doctor.firstName} lastName={doctor.lastName} dimensions={{width: 80, height: 80}} shape='rounded'/>
      )}
      description={<RenderDescription experience={doctor.experience} specialization={doctor.specialization} />}
      disabled={disable}
      onPress={() => {
        if(!disable) {
          navigation.navigate(AppRoute.DOCTOR_INFO, {doctorData: doctor, navigation})
        }
      }}
      // accessoryRight={bookmarkIcon}
    />
  )
}

const RenderItem = ({ item: doctor, navigation, index}) => {
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <RenderDoctor item={doctor} navigation={navigation}/>
        <RenderClinicNames clinics={doctor.clinic} doctorUid={doctor.uid}/>
      </View>
      <Divider />
    </>
  );
};

const DoctorsList = ({searchResults, navigation}) => {
  return (
    <FlatList
      data={searchResults}
      renderItem={({item, index, separators}) => <RenderItem item={item} navigation={navigation} index={index} />}
      ListEmptyComponent={() => <View style={{marginTop: 20}}><EmptyListText /></View>}
    />
  );
};

export {DoctorsList, RenderDoctor};
