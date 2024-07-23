import { useTranslation } from '../../i18n';

export default async function Index({ params: { lng }} : any) {
    const { t } = await useTranslation(lng, 'main');
    return (<>
       asset view
    </>
    );
}