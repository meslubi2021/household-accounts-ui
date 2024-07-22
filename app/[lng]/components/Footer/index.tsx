import { useTranslation } from '../../../i18n'
import { FooterBase } from './Footerbase'

export const Footer = async ({ lng }:any) => {
    const { t } = await useTranslation(lng, 'footer')
    return <FooterBase t={t} lng={lng} />
}
