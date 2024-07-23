import { useTranslation } from '../../i18n';
import { CalendarPage } from '../components';

export default async function Index({ params: { lng }} : any) {
    const { t } = await useTranslation(lng, 'footer')    

    return (<>
        <CalendarPage lng={lng} />
    </>
    );
}