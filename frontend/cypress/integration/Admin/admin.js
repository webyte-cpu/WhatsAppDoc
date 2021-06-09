import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';

import { checkDoctorStatus, getTabSelector, checkChangedStatus } from './common';

Before(() => {
  cy.visit('/signin');
  cy.get('[data-testid=email]').type('Rowland_Veum6@hotmail.com')
  cy.get('[data-testid=password]').type('ZJw_BwW160ZUZI5!')
  cy.get('[data-testid=loginBtn]').click();
  // cy.url().should('eq', Cypress.config().baseUrl + "/admin/admin");
})

Given('I am on {string} tab', (status) => {
  cy.get(getTabSelector(status)).should('be.visible')
  cy.get(getTabSelector(status)).click()
})

Then('I will see all {string} doctors', (status) => {
  checkDoctorStatus(status);
});

Given('I am on pending tab', () => {
  cy.get('[data-testid=pendingTab]').click()
  cy.get('[data-testid=pendingList]').should('not.exist')
  // cy.get('body').find('[data-testid=pendingList]').length

})

// When('I click doctor {string}', (name) => {
//   cy.get("body").then($body => {
//     if ($body.find('[data-testid=pendingList]').length > 0) {
//       cy.get('[data-testid=pendingList]').within(() => {
//         cy.get('[data-testid=doctorDetails]').contains(name).click()
//       })
//     } else {
//       cy.get(checkDoctorStatus(status)).should('not.exist');
//     }
//   });
// })

// Then(`I will see the doctor's license card information`, () => {
//   cy.get('[data-testid=doctorInformation]').should('be.visible')
//   cy.get('[data-testid=linkPRCBtn]').should('be.visible')
//   cy.get('[data-testid=verifyBtn]').should('be.visible')
//   cy.get('[data-testid=denyBtn]').should('be.visible')
// })

// And('I click {string} button', (changeStatus) => {
//   let button;
//   changeStatus == 'verify' ? button = '[data-testid=verifyBtn]' : button = '[data-testid=denyBtn]'
//   cy.get(button).click();
// })


// Then('I will see {string} on {string} tabs', (name, changeStatus) => {
//   checkChangedStatus(name, changeStatus)
// })
