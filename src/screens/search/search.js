import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { IndexPath, Select, SelectItem, Input, Button, Text } from '@ui-kitten/components';

// TODO: refactor to change filtering base on options
// TODO: dynamically change to cater doctor cards

const searchOptions = [ 
  'Name',
  'Location'
]

const selectItem = (title, index) => <SelectItem key={`${title}-${index}`} title={title} />

export const Search = () => {
  const [selectedType, setSelectedType] = useState(new IndexPath(0))

  const selectType = () => {
    const displayValue = searchOptions[selectedType.row];

    return (
      <Select style={{ marginRight: 5 }} size='large' value={displayValue} selectedIndex={selectedType} onSelect={setSelectedType}>
        { searchOptions.map(selectItem)}
      </Select>
    )
  }

  const searchBar = (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', }}>
      <Input placeholder="Find a doctor" size='large' style={{width: '100%'}} />
      {selectType()}
      <Button status="primary">
        <Text style={{ color: 'white' }}>Search</Text>
      </Button>
    </View>
  )
  return (
    <View>
      {searchBar}
    </View>
  )
}