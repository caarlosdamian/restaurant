import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer, Navbar, Notification } from './components';
import AuthProvider from './components/AuthProvider';
import QueryProvider from './components/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carlos Restaurant',
  description: 'Best food ever',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Notification />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
