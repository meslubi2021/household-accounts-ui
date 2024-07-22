import { useTranslation } from '../i18n';
import Link from 'next/link'
import styles from './page.module.scss';
import { Footer } from './components/Footer';

export default async function Index({ params: { lng }} : any) {
  const { t } = await useTranslation(lng, 'intro');  

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (<>
    <h1 className="text-3xl font-bold underline">{t('title')}</h1>
    <Link href={`${lng}/intro`}>intro</Link>
    <Link href={`${lng}/client-page`}>Client page</Link>
    <Footer lng={lng} />
  </>
  );
}