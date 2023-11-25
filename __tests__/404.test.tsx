/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import Custom404 from '@pages/404';

describe('404', () => {
  it('renders correctly', () => {
    const view = render(<Custom404 />);

    expect(view).toMatchSnapshot();
  });
});
