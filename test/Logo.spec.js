import { render } from '@testing-library/react';
import Logo from '@/components/Logo';
import '@testing-library/jest-dom';

describe('Logo', () => {
  test('renders correctly', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
