import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loader from '@components/common/Loader/Loader';

describe('Loader should render correctly', () => {
  test('It should render with SVG-element', async () => {
    render(<Loader />);

    expect(await screen.getByTestId('circle')).toBeInTheDocument();
  });
});
