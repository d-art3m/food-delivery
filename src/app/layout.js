import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './providers';

export const metadata = {
  title: 'Food Delivery',
  description: 'Food delivery app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
