import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, IndexPath } from '@ui-kitten/components';
import Template from '../../components/template';
import Searchbar from './search';
import { TopHeaderView } from '../../components/common';

const SearchPage = ({ navigation, route }) => {
  const { filter: inputFilter } = route.params
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(new IndexPath(inputFilter))

  const searchPage = (
    <View>
      <TopHeaderView title={`Search`} backTo={navigation.goBack} />
      {/* <Text>Search</Text> */}
      <Searchbar filter={filter} setFilter={setFilter} query={query} setQuery={setQuery}/>
    </View>
  )
  return (
    <Template children={searchPage} />
  )
}

export default SearchPage