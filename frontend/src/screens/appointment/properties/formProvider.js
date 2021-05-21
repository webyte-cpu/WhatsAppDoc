import React, { useContext, createContext, useState } from "react";
import * as R from "ramda";

const initialState = {
  initialValues: {},
  values: {},
};

const FormContext = createContext(initialState);

const useProvideForm = () => {
  const [state, setState] = useState(initialState);

  const setValues = (newValues) => {
    const values = R.mergeDeepRight(state.values, newValues);
    setState({values, initialValues: {...state.initialValues}});
  };

  const setInitialValues = (initial) => {
    const initialValues = R.mergeDeepRight(state.initialValues, initial);
    const values = initialValues
    setState({initialValues, values});
  };

  // const resetValues = () => {
  //   setState({initialValues: {...state.initialValues}, values: {}})
  // }

  return { setValues, setInitialValues, ...state };
};

const usePropertiesForm = () => useContext(FormContext);

const PropertiesFormProvider = ({ children }) => {
  const formContext = useProvideForm();
  return (
    <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
  );
};

export { PropertiesFormProvider, usePropertiesForm };
