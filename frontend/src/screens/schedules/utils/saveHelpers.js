import * as R from 'ramda';
import { clinicDataToDB } from '../../../utils/convertData.js';

export const deconstructData = (item) => {
  const deconstructedAddress = { ...item.address };
  const itemObj = R.omit(["address"], item); // {all without address}

  return { ...itemObj, ...deconstructedAddress };
};

export const getInvalidFields = (dataObj) => {
  const data = deconstructData(dataObj);
  const notRequiredKeys = ["roomNumber", "coordinates"];
  const invalidKeys = [];

  for (const key in data) {
    if (R.isEmpty(data[key]) || R.isNil(data[key])) {
      if (!notRequiredKeys.includes(key)) {
        invalidKeys.push(key);
      }
    }
  }

  return invalidKeys;
};

export const handleSaveError = (initialValues, values) => {
  // if saving...
  const dataObj = R.isEmpty(values) ? initialValues : values;
  const invalidFields = getInvalidFields(dataObj);

  if (invalidFields.length > 0) {
    return invalidFields;
  }

  return null;
};

export const getClinicData = (values) => clinicDataToDB(R.omit(["intervals"], values))

export const toUpperCase = (match, _, str ) => {
  console.log(match, _, str)
  return (` ${match.toUpperCase()}`)
}