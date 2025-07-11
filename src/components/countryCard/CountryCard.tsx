import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Country } from '@/types/domain';

import { CountryCardLayout } from './CountryCardLayout';

export default function CountryCard({ country }: { country: Country }) {
  const { t } = useTranslation();

  return (
    <Link href={`/countries/${country.cca3}`}>
      <CountryCardLayout
        image={
          <Image
            src={country.flags}
            alt={`${country.name.common} ${t('flag')}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        }
      >
        <h2 className="text-lg font-semibold text-text">{country.name.common}</h2>
        <p className="text-sm text-text-muted">{country.region}</p>
        <p className="text-sm italic text-text-muted">{country.capital}</p>
      </CountryCardLayout>
    </Link>
  );
}
