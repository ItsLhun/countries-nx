import '@/styles/globals.css';

import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';

import Layout from '@/components/layout/Layout';
import { ThemeProvider } from '@/context/ThemeContext';
import i18nConfig from '@/lib/i18n';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();
  return (
    <ThemeProvider>
      <Head>
        <title>{`${t('title')}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, i18nConfig);
