import React, { createRef } from 'react';

const navigationRef = createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

export {navigationRef,navigate}

//https://reactnavigation.org/docs/navigating-without-navigation-prop/