import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { THEMES } from '@/constants/theme';

import { ThemeProvider, useTheme } from './ThemeContext';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  test('loads theme from localStorage and sets data-theme attribute', () => {
    localStorage.setItem('theme', THEMES.DARK);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(`Current theme: ${THEMES.DARK}`)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.DARK);
  });

  test('toggles theme and updates localStorage and data-theme attribute', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // Initial theme LIGHT
    expect(
      screen.getByText((content) => content.includes(`Current theme: ${THEMES.LIGHT}`)),
    ).toBeInTheDocument();

    const toggleButton = screen.getByText('Toggle');

    // Toggle once -> DARK
    userEvent.click(toggleButton);

    expect(
      await screen.findByText((content) => content.includes(`Current theme: ${THEMES.DARK}`)),
    ).toBeInTheDocument();

    expect(localStorage.getItem('theme')).toBe(THEMES.DARK);
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEMES.DARK);
  });

  test('useTheme throws error if used outside ThemeProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence React error boundary logs

    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within ThemeProvider');

    consoleError.mockRestore();
  });
});
