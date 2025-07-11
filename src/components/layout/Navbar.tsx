import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import LocaleSwitcher from './LocaleSwitcher';
import NavbarSkeleton from './NavbarSkeleton';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const { t, ready } = useTranslation();
  if (!ready) return <NavbarSkeleton />;

  return (
    <div className="bg-content-surface border-b border-border w-full px-6">
      <header className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-tight text-text hover:text-primary-hover transition-colors">
            {t('title')}
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
