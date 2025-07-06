import type { Metadata } from 'next';
import './globals.css';
import { QubicProvider } from '@/hooks/QubicProvider';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QubicProvider>
          {children}
        </QubicProvider>
      </body>
    </html>
  );
}
