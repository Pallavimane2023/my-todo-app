// import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "./Providers";
import { NextIntlClientProvider } from "next-intl";
import {getLocale, getMessages, getTranslations} from 'next-intl/server';
import Navbar from "@/components/Navbar";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations('my-todo');
  return (
    <html lang={locale}>
      <body
      >
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
          <Navbar/>
          <main className="flex-grow p-4">{children}</main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} {t('footer')}
            </p>
          </footer>
          </NextIntlClientProvider>
          </AuthProvider> 
              
      </body>
    </html>
  );
}
