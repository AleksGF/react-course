import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '@components/AppWithRouting/routes';

describe('Routing should work correctly', () => {
  test('404 page should be rendered with incorrect url', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/bad-route'],
    });

    const { getByText } = render(<RouterProvider router={router} />);

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
