import { ReactNode } from 'react';

import Navbar from '@/components/layout/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen scrollbar-gutter-stable bg-background text-text">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
