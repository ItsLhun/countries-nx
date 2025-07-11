# Countries Explorer

Countries Explorer is a lightweight Next.js web application that displays detailed information about countries around the world. It fetches data from the [REST Countries API](https://restcountries.com/) and supports internationalization (English and Spanish) and theming (light/dark).

## Features

- Browse all countries with search/filter support
- View detailed data for each country
- i18n with `next-i18next`
- Dark and light themes with custom theme context
- Responsive and accessible UI
- Skeleton loaders for improved UX
- Unit tested with Jest and Testing Library

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS 4 (custom theme variables)
- next-i18next
- Jest + React Testing Library

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

### Run tests

```bash
npm run test
```

## Project Structure

```bash
src/
  components/        # Reusable UI components
  context/           # Theme context
  hooks/             # Custom React hooks
  lib/               # API helpers, i18n config
  pages/             # Next.js pages
  styles/            # Tailwind CSS and custom theme variables
  types/
    api.ts           # Types matching the REST API
    domain.ts        # Transformed client-facing types
```

## Notes

- No 404 page or fallback handling for invalid country codes was implemented.
- All country data is statically generated at build time.
- `getServerSideProps` is used on the detail page to support direct linking with proper i18n context.

## License

MIT
