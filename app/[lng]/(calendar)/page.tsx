import { CalendarPage } from '@/app/ui/components';

export default async function Index({ params: { lng }} : any) {

  return (<>
    <CalendarPage lng={lng} />
  </>
  );
}