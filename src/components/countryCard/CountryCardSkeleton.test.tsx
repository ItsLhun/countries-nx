import { render } from '@testing-library/react';

import CountryCardSkeleton from './CountryCardSkeleton';

describe('CountryCardSkeleton', () => {
  it('renders placeholder layout without crashing', () => {
    const { container } = render(<CountryCardSkeleton />);
    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });
});
