import { UserAddressSearchComponent } from './user-address-search.component';
import { render } from '@testing-library/angular';
import { MockComponent } from '@findme/ng-find-me/utils-testing';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'findme-search-input',
  template: 'Search Input',
})
class MockInputComponent {
  @Output() focused = new EventEmitter();
  @Output() selected = new EventEmitter();
}

describe('UserAddressSearchComponent', () => {
  test('should render component', async () => {
    const components = [
      MockInputComponent,
      MockComponent({
        selector: 'findme-search-map',
        inputs: ['user'],
        template: 'Search Map',
      }),
      MockComponent({
        selector: 'findme-search-address-detail',
        inputs: ['address', 'username'],
        template: 'Search Detail',
      }),
    ];

    const comp = await render(UserAddressSearchComponent, {
      declarations: components,
    });

    comp.getByText('Find Me');
    comp.getByText('Search Input');
    comp.getByText('Search Map');
  });
});
