//same sa link

import React from 'react';
import { checkErrors } from './validate'

const ShowErr = (props) => {
  const value;
  const validations;
  const display;

  const listErr = () => {
    const { validations, value } = props;
    const errors = checkErrors(value, validations);
    return errors;
  }

  if (!props.display) {
    return null;
  }
  return (
    //listErr()
    props = { value, validations, display }
  )


}

export default ShowErr;

// const App = () => {
//   <ShowErr validations='' value='' display='' />
// }