import { fetchAllCountries, fetchCountryByCode } from '@/pages/api/countries';

export async function getStaticPathsForCountries() {
  const countries = await fetchAllCountries();
  return countries.map((c) => ({ params: { id: c.cca3 } }));
}

export async function getStaticPropsForCountry(id: string) {
  const country = await fetchCountryByCode(id);
  if (!country) throw new Error(`Country with code ${id} not found`);
  return country;
}
