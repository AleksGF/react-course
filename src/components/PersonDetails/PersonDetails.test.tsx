import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/test/providers/customRender';
import { server } from '@/test/__mocks__/mockServer';
import PersonDetails from '@components/PersonDetails/PersonDetails';
import { mockContextsProps } from '@/test/__mocks__/mockContext';

describe('PersonDetails should render correctly', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('it should return empty element when no details param', () => {
    const { container } = customRender(<PersonDetails />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    expect(container).toBeEmptyDOMElement();
  });

  test('it should render loader when fetching data, person details after', async () => {
    const { container, getByTestId, getByText } = customRender(
      <PersonDetails />,
      {
        contextsProps: mockContextsProps,
        route: '/?details=1',
      },
    );

    expect(getByTestId('circle')).toBeInTheDocument();

    await waitFor(
      () =>
        expect(
          getByText('Luke Skywalker was born in 19BBY.'),
        ).toBeInTheDocument(),
      { container },
    );
  });

  test('it should render and handle close button', async () => {
    const { container, queryByTestId } = customRender(<PersonDetails />, {
      contextsProps: mockContextsProps,
      route: '/?details=1',
    });

    const user = userEvent.setup();

    expect(queryByTestId('details-close-btn')).toBe(null);

    await waitFor(
      () => expect(queryByTestId('details-close-btn')).toBeInTheDocument(),
      { container },
    );

    await user.click(queryByTestId('details-close-btn') as HTMLElement);

    expect(window.location.search).toBe('');
  });
});
