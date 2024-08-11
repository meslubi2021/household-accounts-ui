import { CalendarPage } from '@/app/ui/calendar-page';

export default async function Index({ params: { lng }} : any) {
    return (<>
        <CalendarPage lng={lng} />
    </>
    );
}