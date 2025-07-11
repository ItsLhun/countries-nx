import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchCountryByCode } from '@/pages/api/countries';

import type { Country } from '@/types/domain';

export function useCountryData(initial: Country | null): {
  country: Country | null;
  loading: boolean;
  error: boolean;
} {
  const { query } = useRouter();
  const [country, setCountry] = useState<Country | null>(initial);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initial && typeof query.id === 'string') {
      setLoading(true);
      fetchCountryByCode(query.id)
        .then((data) => setCountry(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [initial, query.id]);

  return { country, loading, error };
}
