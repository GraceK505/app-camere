import {NextIntlClientProvider} from 'next-intl';
import "../globals.css";
import MainPage from './page';

const loadMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
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