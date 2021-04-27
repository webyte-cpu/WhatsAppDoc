import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
import { fillFormFields } from "../SignUp/common";

Before(() => {
  cy.visit('/login');
});

Given(`{string} and {string}`, (email, password) => {
  const loginDetails = [
    { testID: "[data-testid=email]", data: email },
    { testID: "[data-testid=password]", data: password },
  ];

  fillFormFields(loginDetails);
});

When("I press login", () => {
  cy.get('[data-testid="loginBtn"]').click();
});

Then(`the result is: {string}`, (status) => {
  switch (status) {
    case "logged in":
      cy.get('[data-testid="welcome-header"]').should("exist");
      break;
    case "not found":
      cy.get('[data-testid="errText"]').should("exist");
      break;
    case "invalid":
      cy.get('[data-testid="welcome-header"]').should("not.exist");
      break;
    default:
      throw new Error("Invalid result type!");
  }
});
