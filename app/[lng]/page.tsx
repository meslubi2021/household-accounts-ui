import { useTranslation } from '../i18n';
import Link from 'next/link'
import { Footer } from './components/Footer';
import { Header } from './components';
import "./sass/index.scss";

export default async function Index({ params: { lng }} : any) {
  const { t } = await useTranslation(lng, 'intro');

  return (<>
    <Header lng={lng} />
    <h1 className="text-3xl font-bold underline">{t('title')}</h1>
    <Link href={`${lng}/intro`}>intro</Link>
    <Link href={`${lng}/client-page`}>Client page</Link>
    <Footer lng={lng} />
  </>
  );
}