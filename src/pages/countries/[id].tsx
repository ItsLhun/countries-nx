import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useCountryData } from '@/hooks/useCountryData';
import { getStaticPropsForCountry } from '@/lib/getCountryData';

import type { Country } from '@/types/domain';

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const id = params?.id as string;
  const country = await getStaticPropsForCountry(id);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      initialCountry: country ?? null,
      key: id,
    },
  };
};

type Props = {
  initialCountry: Country | null;
  key: string;
};

export default function CountryDetailPage({ initialCountry }: Props) {
  const { t, ready } = useTranslation();
  const { locale } = useRouter();
  const { country, error } = useCountryData(initialCountry);

  if (!ready) return null;

  if (error || !country) {
    return (
      <div className="text-center py-8 text-text">
        <p className="text-lg font-semibold">{t('notFound', 'Country not found.')}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← {t('back')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${country.name.common} | ${t('title')}`}</title>
        <meta
          name="description"
          content={`${t('countryDescription', { country: country.name.common })}`}
        />
      </Head>
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-content-surface border border-border text-text hover:text-primary hover:border-primary transition-colors"
          >
            <span className="text-md">←</span>
            <span className="text-sm font-medium">{t('back')}</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-full max-w-md h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image
              src={country.flags}
              alt={`${country.name.common} ${t('flag')}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 w-full max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-text">{country.name.common}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-text-muted">
              <p>
                <strong className="text-text">{t('capital')}:</strong> {country.capital}
              </p>
              <p>
                <strong className="text-text">{t('population')}:</strong>{' '}
                {country.population.toLocaleString(locale)}
              </p>
              <p>
                <strong className="text-text">{t('region')}:</strong> {country.region}
              </p>
              <p>
                <strong className="text-text">{t('cca3')}:</strong> {country.cca3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
