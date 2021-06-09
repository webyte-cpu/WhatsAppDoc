import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import Searchbar from "./search";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOCTORS } from "./utils/queries";
import LoadingScreen from "../../components/loadingScreen";
import { FILTER_BY } from "./utils/filters";
import enums from "../../../helpers/enums";
import {
  getByLocationString,
  getByName,
  getNearbyDoctors,
} from "./utils/searchDoctors";
import { DoctorsList } from "./doctors/doctorsList";
import customStyle from "../../../themes/styles";

const SearchPage = ({ navigation, route }) => {
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(GET_ALL_DOCTORS, {
    onCompleted: (data) => {
      setVerifiedDoctors(
        data.results.filter(
          (doctor) =>
            doctor.verificationStatus === enums.verificationStatus.VERIFIED
        )
      );
    },
    pollInterval: 1000,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (verifiedDoctors) {
      inputSearch(route.params);
    }
  }, [verifiedDoctors]);

  if (loading || queryLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  function searchDoctor(query, filter, verifiedDoctors) {
    let filteredDoctors = [];

    if (verifiedDoctors.length > 0) {
      switch (filter) {
        case FILTER_BY.Name:
          filteredDoctors = getByName(query.query, verifiedDoctors);
          break;
        case FILTER_BY.Location:
          if (query.query.coords) {
            // USE LOCATION
            filteredDoctors = getNearbyDoctors( query.query.coords, verifiedDoctors, 3 );
            return;
          }

          filteredDoctors = getByLocationString(query.query, verifiedDoctors);
          break;
        default:
          console.error("INVALID FILTER");
      }
    }

    return filteredDoctors;
  }

  function inputSearch(input) {
    let matchDoctors;

    if (input.query.query === "") {
      matchDoctors = verifiedDoctors;
    } else {
      matchDoctors = searchDoctor(input.query, input.filter, verifiedDoctors);
    }

    setSearchResults(matchDoctors);
    setLoading(false);
  }

  return (
    <View>
      <View style={[customStyle.contentFill, { paddingBottom: 20 }]}>
        <Searchbar
          inputFilter={route.params.filter}
          inputQuery={route.params.query}
          route={route}
          inputSearch={inputSearch}
        />
      </View>
      <Divider />
      <View style={[customStyle.contentFill, {paddingHorizontal: 10}]}>
        <DoctorsList searchResults={searchResults} navigation={navigation} />
      </View>
    </View>
  );
};

export default SearchPage;
