// Documentation https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS.md
export type ApiCountry = {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  translations?: Record<string, { official: string; common: string }>;
  area?: number;
  borders?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  timezones?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
};
