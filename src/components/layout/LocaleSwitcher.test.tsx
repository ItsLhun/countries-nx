import { I18nextProvider } from 'react-i18next';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import i18n from '@/lib/testI18nMock';

import LocaleSwitcher from './LocaleSwitcher';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    locale: 'en',
    locales: ['en', 'es'],
    asPath: '/current-page',
    push: mockPush,
  });
});

test('renders locale switcher button', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LocaleSwitcher />
    </I18nextProvider>,
  );
  expect(screen.getByRole('button', { name: /language selection/i })).toBeInTheDocument();
});

test('opens and displays language options', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LocaleSwitcher />
    </I18nextProvider>,
  );
  await userEvent.click(screen.getByRole('button', { name: /language selection/i }));
  expect(screen.getByText('English')).toBeInTheDocument();
  expect(screen.getByText('Spanish')).toBeInTheDocument();
});

test('selecting a language triggers router.push', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LocaleSwitcher />
    </I18nextProvider>,
  );
  await userEvent.click(screen.getByRole('button', { name: /language selection/i }));
  await userEvent.click(screen.getByText('Spanish'));
  expect(mockPush).toHaveBeenCalledWith('/current-page', '/current-page', { locale: 'es' });
});
