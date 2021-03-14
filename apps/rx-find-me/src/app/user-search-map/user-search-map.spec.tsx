import React from 'react';
import { render } from '@testing-library/react';

import UserSearchMap from './user-search-map';

describe('UserSearchMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSearchMap user={null} />);
    expect(baseElement).toBeTruthy();
  });
});
