import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';

const personalInfo = [
  {testID: '[data-testid=email]', data: 'edelynnm@gmail.com'},
  {testID: '[data-testid=password]', data: '123Edelynn!'},
  {testID: '[data-testid=fname]', data: 'Edelynn'},
  {testID: '[data-testid=midName]', data: 'Pelaez'},
  {testID: '[data-testid=lname]', data: 'Mallare'},
];

const selectField = [
  {testID: '[data-testid=sex]', data: 1},
  {testID: '[data-testid=birthdate]', data: new Date('10-25-2000')},
]

// const doctorFields = [
//   {testID: '[data-testid=specialization]', data: 'Physician'},
//   {testID: '[data-testid=licenseNum]', data: '1234567'},
// ]

Before(() => {
  cy.visit('/signup');
})

Given('the role is patient', () => {
  cy.get('[data-testid=patientRole]').should('not.be.disabled')
})

And('the form is for patient only', () => {
  cy.get('[data-testid=doctorVerification]').should('not.exist');
});


When('I fill out all the fields', () => {
  personalInfo.forEach((field) => {
    cy.get(field.testID).type(field.data)
  })
  cy.get('[data-testid=sex-female]').click()
  cy.get('[data-testid=birthdate]').click()
  cy.get('[data-name=chevron-down]').click()
  cy.get('[data-name=chevron-left]').dblclick()
  cy.get('.css-text-901oao').contains('2000').click()
  cy.get('.css-text-901oao').contains('Oct').click()
  cy.get('.css-text-901oao').contains('25').click()
  // addressInfo.forEach((field) => {
  //   cy.get(field.testID).type(field.data)
  // })
});

And('click sign up', () => {
  cy.get('[data-testid=signUpBtn]').click()
});

Then('I successfully sign up as patient', () => {
  cy.url().should('eq', Cypress.config().baseUrl + "/home")
})
