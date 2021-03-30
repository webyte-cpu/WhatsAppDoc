import React from 'react';
import { View } from 'react-native';
import Template from '../../components/template';
import { TopHeaderView } from '../../components/common';
import { customStyle } from '../../../themes/styles';
import { Search } from '../search/search';

const HomeScreen = ({ navigation }) => {
  const userFname = 'Edelynn'
 
  const homePage = (
    <>
      <TopHeaderView hasDrawer={true} title={`Hello ${userFname}!`} />
      <View style={{...customStyle.content, marginTop: 10 }}>
        <Search />
      </View>
    </>
  )

  return (
    <Template children={homePage} />
  );
};

export default HomeScreen;
