export const fillFormFields = (fieldsArr) => {
  return fieldsArr.forEach((field) => {
    if (field.data !== '') {
      cy.get(field.testID).type(field.data);
    }
  });
};

export const loginUser = (username, password) => {
  cy.visit('/signin');
  cy.get('[data-testid=email]').type(username)
  cy.get('[data-testid=password]').type(password)
  cy.get('[data-testid=loginBtn]').click();
}

export const runSeed = () => {
  cy.exec('npm run clear:test_db');
  cy.exec('npm run seed:test');
}