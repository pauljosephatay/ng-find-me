import { SearchAddressDetailComponent } from './search-address-detail.component';
import { render } from '@testing-library/angular';

describe('SearchAddressDetailComponent', () => {
  test('should render', async () => {
    const comp = await render(SearchAddressDetailComponent, {
      componentProperties: {
        username: 'John',
        address: {
          name: 'The Tea House',
          withPets: true,
          petPhoto: 'Photo Url',
        },
      },
    });
    comp.getByText('John');
    comp.getByText('The Tea House');
    comp.getByText('With pets: true');
  });
});
