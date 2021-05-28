import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, IndexPath } from '@ui-kitten/components';
import Searchbar from './search';

const SearchPage = ({ navigation, route }) => {
  const { filter, query} = route.params

  const searchPage = (
    <View>
      <Searchbar inputFilter={filter} inputQuery={query} route={route} />
    </View>
  )
  return (
    <View>
      {searchPage}
    </View>
  )
}

export default SearchPage