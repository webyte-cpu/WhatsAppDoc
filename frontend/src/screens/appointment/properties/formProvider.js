import React, { useContext, createContext, useState } from "react";
import * as R from "ramda";
import { intervalsToDB } from "../../schedules/utils/convertData";

const initialState = {
  isLoading: false,
  intervalsToDelete: [],
  initialValues: {},
  values: {}
};

const FormContext = createContext(initialState);

const useProvideForm = () => {
  const [state, setState] = useState(initialState);

  const setValues = (newValues) => {
    const values = R.mergeDeepRight(state.values, newValues);
    setState({...state, values, initialValues: {...state.initialValues}});
  };

  const setInitialValues = (initial) => {
    const initialValues = R.mergeDeepRight(state.initialValues, initial);
    const values = initialValues
    setState({...state, initialValues, values});
  };

  // const resetValues = () => {
  //   setState({initialValues: {...state.initialValues}, values: {}})
  // }
  const setLoading = (loading) => {
    setState({...state, isLoading: loading})
  }

  const setIntervalsToDelete = (interval) => {
    // // const arr = []
    // let intervalsToDelete = state.intervalsToDelete.concat(interval)
    // // if(intervalsToDelete != null) {
    // //   arr.push(intervalsToDelete)
    // // } 
    // // intervalsToDelete.push(interval);
    console.log(interval)

    const newIntervals = R.clone(state.intervalsToDelete)
    newIntervals.push(interval)
    console.log(newIntervals)
    setState({...state, intervalsToDelete: newIntervals})
    console.log(state)
    
  }

  return { setValues, setInitialValues, setLoading, setIntervalsToDelete, ...state };
};

const usePropertiesForm = () => useContext(FormContext);

const PropertiesFormProvider = ({ children }) => {
  const formContext = useProvideForm();
  return (
    <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
  );
};

export { PropertiesFormProvider, usePropertiesForm };
