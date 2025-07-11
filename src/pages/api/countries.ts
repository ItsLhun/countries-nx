import { restCountriesFields } from '@/lib/restcountriesFields';

import type { ApiCountry } from '@/types/api';
import type { Country } from '@/types/domain';

const BASE_URL = 'https://restcountries.com/v3.1';
const FIELDS_PARAMS = new URLSearchParams({
  fields: restCountriesFields.join(','),
}).toString();

export async function fetchAllCountries(): Promise<ApiCountry[]> {
  const res = await fetch(`${BASE_URL}/all?${FIELDS_PARAMS}`);
  if (!res.ok) throw new Error('Failed to fetch countries');

  const data = await res.json();
  return data.map((c: any) => normalizeCountry(c));
}

export async function fetchCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(`${BASE_URL}/alpha/${code}?${FIELDS_PARAMS}`);
  if (!res.ok) return null;

  const data = await res.json();
  return normalizeCountry(data[0] || data);
}

export async function fetchCountryByName(name: string): Promise<ApiCountry[]> {
  const res = await fetch(`${BASE_URL}/name/${name}?${FIELDS_PARAMS}`);
  if (!res.ok) return [];

  const data = await res.json();
  return data.map((c: any) => normalizeCountry(c));
}

function normalizeCountry(c: ApiCountry): Country {
  return {
    cca3: c.cca3,
    name: { common: c.name.common },
    capital: c.capital?.[0] || '—',
    region: c.region,
    population: c.population,
    flags: c.flags.svg,
  };
}
