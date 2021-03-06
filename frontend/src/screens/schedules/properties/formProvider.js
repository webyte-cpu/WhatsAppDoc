import React, { useContext, createContext, useState } from "react";
import * as R from "ramda";
import { intervalsToDB } from "../../../utils/convertData.js";
import ScheduleStackScreen from "../../../navigation/navigatorStacks/scheduleStack.js";

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
    const clone = R.clone(state)

    if(newValues.intervalsToDelete != undefined) {
      clone.intervalsToDelete = clone.intervalsToDelete.concat(newValues.intervalsToDelete)
      delete newValues.intervalsToDelete
    } 

    clone.values = R.mergeDeepRight(clone.values, newValues)
    setState(clone);
  };

  const setInitialValues = (initial) => {
    const initialValues = R.mergeDeepRight(state.initialValues, initial);
    const values = initialValues
    setState({...state, initialValues, values, intervalsToDelete: []});
  };

  const setLoading = (loading) => {
    setState({...state, isLoading: loading})
  }

  return { setValues, setInitialValues, setLoading, ...state };
};

const usePropertiesForm = () => useContext(FormContext);

const PropertiesFormProvider = (props) => {
  const formContext = useProvideForm();
  return (
    <FormContext.Provider value={formContext}>
      <ScheduleStackScreen {...props} />
    </FormContext.Provider>
  );
};

export { PropertiesFormProvider, usePropertiesForm };
