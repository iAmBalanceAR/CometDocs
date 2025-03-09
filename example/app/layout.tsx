import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CometDocs Example',
  description: 'An example of how to use CometDocs in a Next.js project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 