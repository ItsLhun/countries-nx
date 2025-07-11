import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen scrollbar-gutter-stable bg-background text-text">{children}</div>
  );
}
