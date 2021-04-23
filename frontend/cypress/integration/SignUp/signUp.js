import {
  And,
  Before,
  But,
  Given,
  Then,
  When,
  defineParameterType,
} from 'cypress-cucumber-preprocessor/steps';
import {
  fillFormFields,
  selectDate,
  selectSexField,
  uploadFile,
} from './common';

Before(() => {
  cy.visit('/signup');
});

let userFname = '';

Given(`the selected role is PATIENT`, () => {
  cy.get('[data-testid=patientRole]').should('not.be.disabled');
  cy.get('[data-testid=doctorVerification]').should('not.exist');
});

Given(`the selected role is DOCTOR`, () => {
  cy.get('[data-testid=doctorRole]').click();
  cy.get('[data-testid=doctorVerification]').should('exist');
});

And(
  `I type the personal infos: {string}, {string}, {string}, {string}, {string}`,
  (email, password, fname, midname, lname) => {
    userFname = fname;
    const personalInfo = [
      { testID: '[data-testid=email]', data: email },
      { testID: '[data-testid=password]', data: password },
      { testID: '[data-testid=fname]', data: fname },
      { testID: '[data-testid=midname]', data: midname },
      { testID: '[data-testid=lname]', data: lname },
    ];
    fillFormFields(personalInfo);
  }
);

And(`select the sex {string} and birthdate {string}`, (sex, birthdate) => {
  selectSexField(sex);
  selectDate('[data-testid=birthdate]', birthdate, true);
});

And(
  `add my doctor infos: {string}, {string}, {string}`,
  (specialization, licenseNum, expirationDate) => {
    const doctorInfo = [
      { testID: '[data-testid=specialization]', data: specialization },
      { testID: '[data-testid=licenseNum]', data: licenseNum },
    ];

    fillFormFields(doctorInfo);
    selectDate('[data-testid=expirationDate]', expirationDate, false);
  }
);

And(`upload my photo`, () => {
  // cy.get('[data-testid="uploadBtn"]').click();
  uploadFile('[data-testid="addImgBtn"]', 'license-sample.png');
  cy.get('[data-testid="noImgSelected"]').should("not.exist");
});

When(`I click sign up`, () => {
  cy.get('[data-testid="signUpBtn"]').click();
});

Then(`the form is {string}`, (isValid) => {
  if (isValid === 'true') {
    cy.get('[data-testid="welcome-header"]').should('exist');
  }

  if (isValid === 'false') {
    cy.get('[data-testid="welcome-header"]').should('not.exist');
  }
});

// And(`the form is for ${patientRole} only`, () => {
//   cy.get('[data-testid=doctorVerification]').should('not.exist');
// });

// When('I fill out all the fields', (table) => {
//   const inputTable = table.hashes();
//   inputTable.map((row) => {
//     for (const key in row) {
//       // console.log(row, key)
//       cy.get(`[data-testid=${key}]`).type(row[key]);
//     }
//   });
// });

// And('click sign up', () => {
//   cy.get('[data-testid=signUpBtn]').click();
// });

// Then('I successfully sign up as patient', () => {
//   cy.url().should('eq', Cypress.config().baseUrl + '/home');
// });
// let number1;
// let number2;

// Given(`{int} and {int}`,(num1, num2) => {
//   number1=num1
//   number2=num2
//   cy.get('[data-testid=email]').type(num1)
//   cy.get('[data-testid=password]').type(num2)
// })

// When('I add', () => {
//   cy.get('[data-testid=fname]').type(number1 + number2)
// })

// Then(`the result is {int}`, (sum) => {
//   cy.get('[data-testid=fname]').should('eq', sum)
// })
