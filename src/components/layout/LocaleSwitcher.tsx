import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { PlanetIcon } from '../icons/PlanetIcon';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    setOpen(false);
    router.push(asPath, asPath, { locale: newLocale });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md bg-content-surface text-text hover:text-primary transition"
        aria-label="Language selection"
      >
        <PlanetIcon className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-md bg-content-surface shadow-lg border border-border z-10">
          <ul className="py-1 text-sm text-text">
            {locales?.map((loc) => (
              <li key={loc}>
                <button
                  onClick={() => handleChange(loc)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    loc === locale ? 'text-primary font-medium' : ''
                  }`}
                >
                  {t(`lang.${loc}`, loc)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
