import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "../globals.css";
import Loader from '@/components/loader';
import MainPage from './page';
import { redirect } from 'next/navigation';

const loadMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    // Fallback to English if the locale file is missing
    return (await import(`../../messages/en.json`)).default;
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
  const messages = await loadMessages(locale);
  
  return (
    <NextIntlClientProvider messages={messages}>
      <MainPage children={children} />
    </NextIntlClientProvider>
  );
}