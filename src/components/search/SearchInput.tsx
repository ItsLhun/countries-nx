import { useEffect, useState } from 'react';

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(timeout);
  }, [local]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-md px-4 py-2 border border-border rounded-md bg-content-surface text-text placeholder-text-muted shadow-sm focus:outline-none focus:ring focus:border-primary"
    />
  );
}
