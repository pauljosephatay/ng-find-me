import React from 'react';
import { render } from '@testing-library/react';

import UserSearchDetail from './user-search-detail';

describe('UserSearchDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSearchDetail user={null} />);
    expect(baseElement).toBeTruthy();
  });
});
