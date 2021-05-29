import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import {
  IndexPath,
  Select,
  SelectItem,
  Input,
  Button,
  Text,
  useTheme,
  Card,
  Icon,
} from '@ui-kitten/components';
import {searchFilters} from './filters';
import { AppRoute } from '../../navigation/app-routes';

// TODO: refactor to change filtering base on options
// TODO: dynamically change to cater doctor cards

const selectItem = (title, index) => (
  <SelectItem key={`${title}-${index}`} title={title} />
);

const Searchbar = ({inputFilter, inputQuery, navigation, route}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState(inputFilter == null ? new IndexPath(0): new IndexPath(inputFilter))
  const [query, setQuery] = useState(inputQuery ?? '')

  const SelectType = () => (
    <Select
      style={{width: 135}}
      status="warning"
      value={searchFilters[filter.row]}
      selectedIndex={filter}
      onSelect={setFilter}
    >
      {searchFilters.map(selectItem)}
    </Select>
  );
console.log(navigation, 'route')
  const searchBtn = (props) => (
    <TouchableWithoutFeedback onPress={() => {
      if(route.name === AppRoute.HOME) {
       return navigation.navigate(AppRoute.SEARCH, {query, filter: filter.row})
      }

      return alert('get query')
      }}>
   <View style={{borderLeftWidth: 1, borderLeftColor: '#e4e9f2', paddingLeft: 5}}>
   <Icon {...props} name="search"/>

   </View>

    </TouchableWithoutFeedback>
  );

  const searchBar = (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      <View style={{flexDirection: 'row' }}>
      <SelectType />
      <Input
        textStyle={{ paddingLeft: 10 }}
        placeholderTextColor={theme['color-primary-dark']}
        placeholder="Find a doctor"
        value={query}
        accessoryRight={(props) => searchBtn(props)}
        onChangeText={setQuery}
        style={{flex: 1, marginLeft: 5}}
      />
      </View>
      
    </View>
  );

  return <View>{searchBar}</View>;
};

export default Searchbar;
