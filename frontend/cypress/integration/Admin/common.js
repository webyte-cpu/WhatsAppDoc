
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
    let listSelector;
  
    switch (status) {
      case 'VERIFIED':
        listSelector = `[data-testid=verifiedList]`;
        break;
      case 'UNVERIFIED':
        listSelector = '[data-testid=unverifiedList]';
        break;
      default:
        listSelector = '[data-testid=pendingList]';
        break;
    }
  
    cy.get(listSelector).within(() => {
      if (cy.get('[data-testid=doctorDetails]').length > 0) {
        cy.get('[data-testid=doctorDetails]').each(item => {
          expect(item).to.contain(status)
        })
      } else {
        cy.log(`No ${status} doctors`)
      }
    })
  }
  
  export const checkChangedStatus = (name, changeStatus) => {
    let tabSelector;
    let listSelector;
  
    if (changeStatus === 'verify') {
      tabSelector = '[data-testid=verifiedTab]'
      listSelector = '[data-testid=verifiedList]'
    } else if (changeStatus === 'deny') {
      tabSelector = '[data-testid=unverifiedTab]'
      listSelector = '[data-testid=unverifiedList]'
    }
  
    cy.get(tabSelector).click();
    cy.get(listSelector).contains(name);
  }