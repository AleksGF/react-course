import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@src/test/providers/customRender';
import { server } from '@src/test/__mocks__/mockServer';
import PersonDetails from '@src/components/PersonDetails/PersonDetails';
import { stateWithInitialization } from '@src/test/__mocks__/mockStore';

describe('PersonDetails should render correctly', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('it should render loader when fetching data, person details after', async () => {
    const { container, getByTestId, getByText } = customRender(
      <PersonDetails personId={1} />,
      {
        preloadedState: stateWithInitialization,
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
    const { container, queryByTestId } = customRender(
      <PersonDetails personId={1} />,
      {
        preloadedState: stateWithInitialization,
      },
    );

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
