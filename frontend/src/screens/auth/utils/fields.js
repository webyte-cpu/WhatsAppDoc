import React from 'react';
import { Input, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import { CIVIL_STATUS } from '../../../utils/constants';
import countryList from '../../../utils/countries.json';

const PersonalFields = ({ userDetails, editUserDetails }) => {
  return (
    <>
      <Input
        testID="fname"
        label="First Name"
        value={userDetails.fname}
        onChangeText={(value) => editUserDetails('fname', value)}
        placeholder="Enter First Name"
        textContentType="givenName"
        returnKeyType="next"
      />

      <Input
        testID="midName"
        label="Middle Name"
        value={userDetails.midName}
        onChangeText={(value) => editUserDetails('midName', value)}
        placeholder="Enter Middle Name"
        textContentType="middleName"
        returnKeyType="next"
      />

      <Input
        testID="lname"
        label="Last Name"
        value={userDetails.lname}
        onChangeText={(value) => editUserDetails('lname', value)}
        placeholder="Enter Last Name"
        textContentType="familyName"
      />
    </>
  );
}

const PatientFields = ({ patientDetails, editPatientDetails }) => {
  const nationalitiesData = countryList.map((data) => data.nationality)

  const civilStatusField = (
    <Select
      testID="civilStatus"
      label='Civil Status'
      placeholder="Select Civil Status"
      value={CIVIL_STATUS[patientDetails.civilStatus.row]}
      selectedIndex={patientDetails.civilStatus}
      onSelect={(value) => editPatientDetails('civilStatus', value)}
    >
      {CIVIL_STATUS.map((status) => (
        <SelectItem key={status} title={status}></SelectItem>
      ))}
    </Select>
  )

  const nationalityField = (
    <Select
      testID='nationality'
      label='Nationality'
      placeholder="Select your Nationality"
      value={nationalitiesData[patientDetails.nationality.row]}
      selectedIndex={patientDetails.nationality}
      onSelect={(value) => editPatientDetails('nationality', value)}
    >
      {nationalitiesData.map((nationality, index) => (
        <SelectItem key={index} title={nationality} />
      ))}
    </Select>
  )

  return (
    <>
      <Datepicker
        testID="birthdate"
        min={new Date('1700-01-01')}
        label="Birthdate"
        date={patientDetails.birthdate}
        onSelect={(date) => editPatientDetails('birthdate', date)}
      />

      <Input
        testID="contactNum"
        label="Contact Number"
        value={patientDetails.contactNum}
        onChangeText={(value) => editPatientDetails('contactNum', value)}
        placeholder="Enter Contact Number"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        returnKeyType="next"
      />

      {civilStatusField}
      {nationalityField}
    </>
  )
}

const AddressFields = ({ addressDetails, editAddressDetails }) => {
  const countriesData = countryList.map((data) => data.country)

  return (
    <>
      <Input
        testID="address"
        label="Address"
        caption="House Number, Street Name, Barangay"
        value={addressDetails.address}
        onChangeText={(value) => editAddressDetails('address', value)}
        placeholder="Enter Address"
        returnKeyType="next"
        multiline
        style={{ marginBottom: 10 }}
      />

      <Input
        testID="city"
        label="City"
        value={addressDetails.city}
        onChangeText={(value) => editAddressDetails('city', value)}
        placeholder="City"
        returnKeyType="next"
      />

      <Input
        testID="province"
        label="State/Province"
        value={addressDetails.province}
        placeholder="Enter State/Province"
        onChangeText={(value) => editAddressDetails('province', value)}
        returnKeyType="next"
      />

      <Input
        testID="zipCode"
        label="Zip/Postal Code"
        value={addressDetails.zipCode}
        placeholder="Enter Zip/Postal Code"
        onChangeText={(value) => editAddressDetails('zipCode', value)}
        returnKeyType="next"
        style={{ flex: 0.4, marginRight: 10 }}
      />

      <Select
        testID='country'
        label='Country'
        placeholder="Select your Country"
        value={countriesData[addressDetails.country.row]}
        selectedIndex={addressDetails.country}
        onSelect={(value) => editAddressDetails('country', value)}
        style={{ flex: 0.6 }}
      >
        {countriesData.map((country, index) => (
          <SelectItem key={index} title={country} />
        ))}
      </Select>
    </>
  )
}

export { PersonalFields, PatientFields, AddressFields }