import { useTranslation } from '../../../i18n'

export const CalendarPage = async ({ lng }: { lng: string }) => {
    const { t } = await useTranslation(lng, 'calendar')    
    return (<>
        CalendarPage
    </>)
}