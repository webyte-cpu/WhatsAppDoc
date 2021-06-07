import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, Platform } from "react-native";
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
} from "@ui-kitten/components";
import { FILTER_BY, searchFilters } from "./utils/filters";
import { AppRoute } from "../../navigation/app-routes";
import {
  fetchLocation,
  geoDecode,
  webGeoDecode,
} from "../../components/maps/mapUtils";
import * as Location from "expo-location";
import * as R from "ramda";
import LoadingScreen from "../../components/loadingScreen";

// TODO: refactor to change filtering base on options
// TODO: dynamically change to cater doctor cards

const selectItem = (title, index) => (
  <SelectItem key={`${title}-${index}`} title={title} />
);

const Searchbar = ({
  inputFilter,
  inputQuery, // {query: '', coords: {}}
  navigation,
  route,
  inputSearch,
}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState(
    inputFilter == null ? new IndexPath(0) : new IndexPath(inputFilter)
  );
  const [query, setQuery] = useState(inputQuery ?? {query: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(inputSearch) {
      inputSearch({query: query, filter: filter.row })
    }
  },[query])

  const autoSetAddress = async () => {
    if (filter.row === FILTER_BY.Location) {
      const location = await fetchLocation();

      if (location) { // allowed
        setLoading(true);
        const [response] = await Location.reverseGeocodeAsync(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          { useGoogleMaps: true }
        );
        const addressQuery = R.props(
          ["street", "district", "city", "subregion", "region"],
          response
        )
          .filter((e) => e != null)
          .join(", ");

        // autoset CURRENT LOCATION to query field
        setLoading(false);
        setQuery({ query: addressQuery, coords: location.coords });
      }
    }
  };

  const SelectType = () => (
    <Select
      style={{ width: 135 }}
      status="warning"
      value={searchFilters[filter.row]}
      selectedIndex={filter}
      onSelect={(selectedFilter) => {
        setQuery({ query: "" }); //clear on change filter
        setFilter(selectedFilter);
      }}
    >
      {searchFilters.map(selectItem)}
    </Select>
  );

  const LocationBtn = (props) => {
    return (
      <TouchableWithoutFeedback
        onPress={async () => {
          await autoSetAddress();
        }}
      >
        <View>
          <Icon {...props} fill="#bfcad9" name="navigation-2" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const searchBtn = (props) => (
    <>
      {filter.row === FILTER_BY.Location && !loading ? (
        <LocationBtn {...props} />
      ) : filter.row === FILTER_BY.Location ? (
        <View style={{ marginRight: 8 }}>
          <LoadingScreen size="small" />
        </View>
      ) : (
        <></>
      )}

      <TouchableWithoutFeedback
        onPress={() => {
          if (route.name === AppRoute.HOME) {
            return navigation.navigate(AppRoute.SEARCH, { query: query, filter: filter.row });
          }

          return inputSearch({query: query, filter: filter.row });
        }}
      >
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: "#e4e9f2",
            paddingLeft: 5,
          }}
        >
          <Icon {...props} name="search" fill={theme["color-primary-500"]} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );

  const searchBar = (
    <View
      style={{
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <SelectType />
        <Input
          textStyle={{ paddingLeft: 10 }}
          placeholderTextColor={theme["color-primary-dark"]}
          placeholder={filter.row === FILTER_BY.Name ? "Enter doctor's name" : "Enter a location"}
          value={query.query}
          accessoryRight={(props) => searchBtn(props)}
          onChangeText={(text) => setQuery({ query: text })}
          style={{ flex: 1, marginLeft: 5 }}
        />
      </View>
    </View>
  );

  return <View>{searchBar}</View>;
};

export default Searchbar;
