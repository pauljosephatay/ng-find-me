import React from 'react';
import { act, render, waitFor, screen } from '@testing-library/react';

import UserSearchInput from './user-search-input';
import fetchMock from 'fetch-mock';

describe('UserSearchInput', () => {
  it('should render successfully', async () => {
    fetchMock.mock('*', []);

    const { baseElement } = render(
      <UserSearchInput onValueChange={() => null} />
    );

    expect(baseElement).toBeTruthy();

    await waitFor(() => screen.getByText('Rx Find Me'));

    fetchMock.reset();
  });
});
