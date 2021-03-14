import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';
import fetchMock from 'fetch-mock';

describe('App', () => {
  it('should render successfully', async () => {
    fetchMock.mock('*', []);
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
    await waitFor(() => screen.getByText('Rx Find Me'));
    fetchMock.restore();
  });
});
