import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';

import { fillFormFields } from '../common.js'

Given('I log in as DOCTOR', () => {
  cy.visit('/login');
    cy.get('[data-testid=email]').type('Billie97@yahoo.com')
    cy.get('[data-testid=password]').type('guG3Xxq9j4_GqQ2!')
    cy.get('[data-testid=loginBtn]').click();
})

And('I am on the Clinics Tab', () => {
  cy.get('[data-testid="calendar"]').click();
  cy.get('[data-testid="clinic-page"]').click();
})

When(`I add a new clinic: {string}`, (name) => {
  cy.get('[data-testid="btnTitle"').click();
  cy.get('[data-testid="clinicName"').type(name);
  cy.get('[data-testid="clinicNameBtn"]').click();
})

And(`add details on the about form: {string}`,
  (location) => {
  //   const details =[
  //     { testID: '[data-testid="consultation-fee"]', data: consultationFee },
  //     { testID: '[data-testid="location-map"]', data: location },
  //     { testID: '[data-testid="roomNumber"]', data: roomNumber },
  //     { testID: '[data-testid="streetAddress"]', data: streetAddress },
  //     { testID: '[data-testid="city"]', data: city },
  //     { testID: '[data-testid="province"]', data: stateProvince },
  //     { testID: '[data-testid="zipCode  "]', data: postalCode },
  //     { testID: '[data-testid="country"]', data: country }
  //   ]

  //   fillFormFields(details);
  cy.get('[data-testid="location"]').type(location)
  
})

And(`add details on the availlability form: {string}`, (intervals) => {
  cy.get('[data-testid="availability-tab"]').click();
  console.log(JSON.parse(intervals));
})

And(`I input the minimum schedule notice hours: {string}`, (minNoticeHrs) => {
  cy.get('[data-testid="limits"]').click();
  cy.get('[data-testid="schedulingNotice"]').type(minNoticeHrs);
})

And('I Save', () => {
  cy.get('[data-testid="scheduleSaveBtn"]').click();
})

// Then(`The result is: {string}`, (result) => {
  
// })