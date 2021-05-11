import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, IndexPath } from '@ui-kitten/components';
import Searchbar from './search';

const SearchPage = ({ navigation, route }) => {
  // const { filter: inputFilter } = route.params
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(new IndexPath(0))

  const searchPage = (
    <View>
      <Searchbar filter={filter} setFilter={setFilter} query={query} setQuery={setQuery}/>
    </View>
  )
  return (
    <View>
      {searchPage}
    </View>
  )
}

export default SearchPage