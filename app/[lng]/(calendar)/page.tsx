import { CalendarPage } from '../components';

export default async function Index({ params: { lng }} : any) {

  return (<>
    <CalendarPage lng={lng} />
  </>
  );
}