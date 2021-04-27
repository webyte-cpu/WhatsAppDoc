import {
  After,
  And,
  Before,
  But,
  Given,
  Then,
  When
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
