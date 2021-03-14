import {
  getAutoCompleteOptions,
  getFindMeSearchField,
  getAutoCompleteList,
  getMapMarker,
} from '../support/app.po';

describe('Find me angular app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display users auto complete options', () => {
    const searchField = getFindMeSearchField();
    searchField.clear();
    searchField.type('an');
    searchField.type('dy');
    getAutoCompleteList();
    const options = getAutoCompleteOptions();
    options.first().contains('Andy');
  });

  it('should display marker after selecting user', () => {
    const searchField = getFindMeSearchField();
    searchField.clear();
    searchField.type('an');
    searchField.type('dy');
    getAutoCompleteList();
    const options = getAutoCompleteOptions();
    options.first().click();
    const marker = getMapMarker();
    marker.should('exist');
  });
});
