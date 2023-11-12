import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Loader from '@components/common/Loader/Loader';

describe('Loader should render correctly', () => {
  test('It should render with SVG-element', async () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId('circle')).toBeInTheDocument();
  });
});
