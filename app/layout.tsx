import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { AdminProvider, AdminAccessModal, AdminButton } from '@/components/AdminContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'André SENOU - Portfolio',
  description: 'Portfolio d\'André SENOU, ingénieur en énergétique et procédés',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <AdminProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AdminAccessModal />
          <AdminButton />
        </AdminProvider>
      </body>
    </html>
  );
}