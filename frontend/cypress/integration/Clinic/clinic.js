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
  cy.get('[data-testid=email]').type('Blake_Gleichner@gmail.com')
  cy.get('[data-testid=password]').type('udHCyaQtfxpZN6r!')
  cy.get('[data-testid=loginBtn]').click();
})

And('I am on the Clinics Tab', () => {
  cy.get('[data-testid="schedule"]').click();
})

When(`I add a new clinic: {string}`, (name) => {
  cy.get('[data-testid="clinicName"').type(name);
  cy.get('[data-testid="clinicNameBtn"').click();
})

And(`add details on the about form: {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}`, 
  (consultationFee, location, roomNumber, streetAddress, city, stateProvince, postalCode,country) => {
    const details =[
      { testID: '[data-testid="consultation-fee"]', data: consultationFee },
      { testID: '[data-testid="location-map"]', data: location },
      { testID: '[data-testid="roomNumber"]', data: roomNumber },
      { testID: '[data-testid="streetAddress"]', data: streetAddress },
      { testID: '[data-testid="city"]', data: city },
      { testID: '[data-testid="province"]', data: stateProvince },
      { testID: '[data-testid="zipCode  "]', data: postalCode },
      { testID: '[data-testid="country"]', data: country }
    ]

    fillFormFields(details);
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

Then(`The result is: {string}`, (result) => {
  cy.get('[]')
})