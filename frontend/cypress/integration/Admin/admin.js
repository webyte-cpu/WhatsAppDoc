import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';

import { checkDoctorStatus, getTabSelector, checkChangedStatus } from './common';
import { loginUser, runSeed } from '../common'

Before(() => {
  runSeed();
  loginUser('Rowland_Veum6@hotmail.com', 'ZJw_BwW160ZUZI5!');
  // cy.url().should('eq', Cypress.config().baseUrl + "/admin/admin");
})

Given('I am on {string} tab', (status) => {
  cy.get(getTabSelector(status)).should('be.visible')
  cy.get(getTabSelector(status)).click()
})

Then('I will see all {string} doctors', (status) => {
  checkDoctorStatus(status);
});

Given('I am already on {string} tab', (status) => {
  cy.get(getTabSelector(status)).click()
})

When('I click the user details with {string} status', (status) => {
  switch (status) {
    case 'VERIFIED':
      cy.get('[data-testid=verifiedList] > :nth-child(1) > :nth-child(1) > [data-testid=doctorDetails]').click(); 
      break;
    
    default:
      cy.get('[data-testid=unverifiedList] > :nth-child(1) > :nth-child(1) > [data-testid=doctorDetails]').click();
      break;
  }
})

Then("I will see the doctor's license card information", () => {
  cy.get('[data-testId=licenseImg]').should('be.visible');
  cy.get('[data-testId=birthdate]').should('be.visible');
  cy.get('[data-testId=licenseNum]').should('be.visible');
  cy.get('[data-testId=licenseExpiry]').should('be.visible');
})