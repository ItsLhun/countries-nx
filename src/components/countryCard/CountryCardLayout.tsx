export function CountryCardLayout({
  image,
  children,
}: {
  image?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="block bg-content-surface rounded-lg border border-border hover:shadow-md transition overflow-hidden">
      <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-800">{image}</div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}
