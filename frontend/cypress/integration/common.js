export const fillFormFields = (fieldsArr) => {
  return fieldsArr.forEach((field) => {
    if (field.data !== '') {
      cy.get(field.testID).type(field.data);
    }
  });
};