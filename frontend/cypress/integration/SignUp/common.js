import { months } from "../../../helpers/dates";
import "cypress-file-upload";

export const fillFormFields = (fieldsArr) => {
  return fieldsArr.forEach((field) => {
    if (field.data !== "") {
      cy.get(field.testID).type(field.data);
    }
  });
};

export const selectSexField = (sex) => {
  cy.get(`[data-testid=sex-${sex.toLowerCase()}]`).click();
};

export const selectDate = (selector, date, isBackBtn) => {
  const [day, month, year] = date.split("-");
  const monthIndex = Number(month) - 1;

  cy.get(selector).click();
  cy.get(
    '[style="border-color: rgb(228, 233, 242); border-radius: 4px; border-width: 1px; padding-top: 8px; padding-bottom: 8px; width: 344px;"] > .r-justifyContent-1wtj0ep > :nth-child(1)'
  )
    .as("yearList")
    .click();

  if (isBackBtn) {
    cy.get(".r-justifyContent-1wtj0ep > :nth-child(2) > :nth-child(1)")
      .as("chevron-left")
      .dblclick();
  }

  cy.get(".css-text-901oao").contains(year).click();
  cy.get(".css-text-901oao").contains(months[monthIndex]).click();
  cy.get(".css-view-1dbjc4n > .r-overflow-1udh08x").within(() => cy.contains(Number(day)).click());
};

export const uploadFile = (fileSelector, filePath) => {

  cy.get(fileSelector).attachFile(filePath);

};
