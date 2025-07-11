import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CountryCard from '@/components/countryCard/CountryCard';
import CountryCardSkeleton from '@/components/countryCard/CountryCardSkeleton';
import NoResults from '@/components/search/NoResults';
import SearchInput from '@/components/search/SearchInput';
import { fetchAllCountries } from '@/pages/api/countries';

import type { Country } from '@/types/domain';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const countries = await fetchAllCountries();
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      countries,
    },
  };
};

type Props = {
  countries: Country[];
};

export default function HomePage({ countries }: Props) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Country[]>(countries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setFiltered(
        countries.filter((c) => c.name.common.toLowerCase().includes(query.toLowerCase())),
      );
      setLoading(false);
    }, 150);
    return () => clearTimeout(timeout);
  }, [query, countries]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Head>
        <meta name="description" content="Browse countries by name, region, and more." />
      </Head>
      <SearchInput value={query} onChange={setQuery} placeholder={t('search')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <CountryCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <NoResults />
        ) : (
          filtered.map((country) => <CountryCard key={country.cca3} country={country} />)
        )}
      </div>
    </div>
  );
}
