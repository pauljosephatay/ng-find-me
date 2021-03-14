export const getFindMeSearchField = () => cy.get('input');
export const getAutoCompleteOptions = () => cy.get('button[role="option"]');
export const getAutoCompleteList = () =>
  cy.get('[role=listbox]', { timeout: 8000 });
export const getMapMarker = () => cy.get('.gm-style img');
