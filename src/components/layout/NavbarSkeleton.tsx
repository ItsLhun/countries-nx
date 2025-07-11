export default function NavbarSkeleton() {
  return (
    <header className="bg-content-surface border-b border-border px-6 py-4 flex justify-between items-center">
      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-6 w-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    </header>
  );
}
