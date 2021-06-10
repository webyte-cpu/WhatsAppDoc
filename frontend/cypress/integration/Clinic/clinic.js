import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';

import { fillFormFields, runSeed, loginUser } from '../common.js'

Before(() => {
  runSeed();
  loginUser('Billie97@yahoo.com', 'guG3Xxq9j4_GqQ2!')
})

Given('I am on the clinics tab', () => {
  cy.get('[data-testid="calendar"]').click();
  cy.get('[data-testid="clinic-page"]').click();
})

And('I add a new Clinic called {string}', (clinicName) => {
  cy.get('[data-testid="btnTitle"').click();
  cy.get('[data-testid="clinicName"').type(clinicName);
  cy.get('[data-testid="clinicNameBtn"]').click();
})

And(`add details on the ABOUT form: {string} {string} {string} {string} {string} {string} {string} {string}`,
  (consultationFee, location, roomNumber, streetAddress, city, stateProvince, postalCode, country) => {
    const details = [
      { testID: '[data-testid="consultation-fee"]', data: consultationFee },
      { testID: '[data-testid="location-map"]', data: location },
      { testID: '[data-testid="roomNumber"]', data: roomNumber },
      { testID: '[data-testid="streetAddress"]', data: streetAddress },
      { testID: '[data-testid="city"]', data: city },
      { testID: '[data-testid="province"]', data: stateProvince },
      { testID: '[data-testid="zipCode"]', data: postalCode },
      { testID: '[data-testid="country"]', data: country }
    ]
    fillFormFields(details);
  }
)

And('add details on the AVAILABILITY form', () => {
  cy.get('.r-flexDirection-1d5kdc7 > :nth-child(1) > :nth-child(1) > [style="background-color: rgb(222, 228, 242);"] > :nth-child(1) > .r-flexDirection-18u37iz > :nth-child(2)').click();
  cy.get('[data-testid="timeDurationBtn"]').click({ multiple: true });

  //FROM Form
  cy.get('[style="margin-right: 10px;"] > .css-view-1dbjc4n > :nth-child(1)').select('10');
  cy.get('[style="margin-right: 10px;"] > .css-view-1dbjc4n > :nth-child(2)').select('45');
  cy.get('[style="margin-right: 10px;"] > .css-view-1dbjc4n > :nth-child(3)').select('PM');

  //TO Form
  cy.get('.r-flexWrap-1w6e6rj > .r-flexDirection-eqz5dr > .css-view-1dbjc4n > :nth-child(1)').select('05');
  cy.get('.r-flexWrap-1w6e6rj > .r-flexDirection-eqz5dr > .css-view-1dbjc4n > :nth-child(2)').select('00');
  cy.get('.r-flexWrap-1w6e6rj > .r-flexDirection-eqz5dr > .css-view-1dbjc4n > :nth-child(3)').select('AM');

  //Days
  cy.get('.r-flex-pv33jp > :nth-child(1) > .r-alignItems-1awozwy').click();

  //Days options
  cy.get('.r-borderColor-5gffqa > .r-WebkitOverflowScrolling-150rngu > :nth-child(1) > :nth-child(1) > .r-backgroundColor-14lw9ot').click();
  cy.get('.r-borderColor-5gffqa > .r-WebkitOverflowScrolling-150rngu > :nth-child(1) > :nth-child(2) > .r-backgroundColor-14lw9ot').click();
  cy.get('.r-borderColor-5gffqa > .r-WebkitOverflowScrolling-150rngu > :nth-child(1) > :nth-child(3) > .r-backgroundColor-14lw9ot').click();

  cy.get('#root > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .r-bottom-1p0dtai').click('right');
})

And('add details on the LIMITS form: {string}', (minSchedNotice) => {
  cy.get(
    '[style="background-color: rgb(222, 228, 242);"] > :nth-child(1) > .r-flexDirection-18u37iz > :nth-child(3)'
  ).click();
  cy.get('.r-flex-13awgt0.r-flexDirection-18u37iz > :nth-child(3) > .r-backgroundColor-14lw9ot').should('be.visible');
  cy.get('[data-testid=schedulingNotice]').should('exist');
  // cy.get('[data-testid=schedulingNotice]').type({ selectall });
  cy.get('[data-testid=schedulingNotice]').click().clear().type(minSchedNotice);
})

When('I press save', () => {
  cy.get('[data-testid="scheduleSaveBtn"]').click();
})

Then('I will be on the Schedule Tab', () => {
  cy.get('[data-testid=addNewClinicBtn]').should('be.visible');
})

// And(`add details on the availlability form: {string}`, (intervals) => {
//   console.log(JSON.parse(intervals));
// })

// And(`I input the minimum schedule notice hours: {string}`, (minNoticeHrs) => {
//   cy.get('[data-testid="limits"]').click();
//   cy.get('[data-testid="schedulingNotice"]').type(minNoticeHrs);
// })

// And('I Save', () => {
//   cy.get('[data-testid="scheduleSaveBtn"]').click();
// })

// Then(`The result is: {string}`, (result) => {

// })