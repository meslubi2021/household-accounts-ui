import { useTranslation } from '../../../i18n'

export const Header = async ({ lng }: { lng: string }) => {
    const { t } = await useTranslation(lng, 'footer');
    return (
      <div className="header flex justify-around items-center">
        Header
    </div>)
}