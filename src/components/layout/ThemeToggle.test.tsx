import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@/context/ThemeContext';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  test('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  test('toggles theme on click', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole('button', { name: /toggle theme/i });
    const initial = document.documentElement.getAttribute('data-theme');
    await userEvent.click(btn);
    const after = document.documentElement.getAttribute('data-theme');
    expect(after).not.toBe(initial);
  });
});
