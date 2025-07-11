import { CountryCardLayout } from './CountryCardLayout';

export default function CountryCardSkeleton() {
  return (
    <CountryCardLayout
      image={<div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />}
    >
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </CountryCardLayout>
  );
}
