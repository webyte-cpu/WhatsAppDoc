export const getTabSelector = (status) => {
  let tabSelector;

  switch (status) {
    case 'VERIFIED':
      tabSelector = `[data-testid=verifiedTab]`;
      break;
    case 'UNVERIFIED':
      tabSelector = '[data-testid=unverifiedTab]';
      break;
    default:
      tabSelector = '[data-testid=pendingTab]';
      break;
  }
  return tabSelector
}

export const checkDoctorStatus = (status) => {
  switch (status) {
    case 'VERIFIED':
    
      cy.get('[data-testid=verifiedList]').should('exist');
      break;

    case 'UNVERIFIED':
      
      cy.get('[data-testid=unverifiedList]').should('exist');
      break;

    default:
      
      cy.get('[data-testid=pendingList]').should('not.exist');
      break;
  }
}

// export const checkChangedStatus = (name, changeStatus) => {
//   let tabSelector;
//   let listSelector;

//   if (changeStatus === 'verify') {
//     tabSelector = '[data-testid=verifiedTab]'
//     listSelector = '[data-testid=verifiedList]'
//   } else if (changeStatus === 'deny') {
//     tabSelector = '[data-testid=unverifiedTab]'
//     listSelector = '[data-testid=unverifiedList]'
//   }

//   cy.get(tabSelector).click();
//   cy.get(listSelector).contains(name);
// }
