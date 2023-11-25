/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import Custom500 from '@pages/500';

describe('500', () => {
  it('renders correctly', () => {
    const view = render(<Custom500 />);

    expect(view).toMatchSnapshot();
  });
});
