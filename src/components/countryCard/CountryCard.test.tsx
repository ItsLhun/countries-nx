import { I18nextProvider } from 'react-i18next';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '@/context/ThemeContext';
import i18n from '@/lib/testI18nMock';
import { Country } from '@/types/domain';

import CountryCard from './CountryCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockCountry: Country = {
  cca3: 'ESP',
  name: { common: 'Spain' },
  capital: 'Madrid',
  region: 'Europe',
  population: 47351567,
  flags: 'https://flagcdn.com/es.svg',
};

describe('CountryCard', () => {
  it('renders country information', () => {
    render(
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <CountryCard country={mockCountry} />
        </I18nextProvider>
      </ThemeProvider>,
    );

    expect(screen.getByText('Spain')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags);
  });
});
