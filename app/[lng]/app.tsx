'use client'

import { Provider } from 'react-redux';
import { store } from "@/app/lib/redux/store";
import '@/app/ui/sass/index.scss';

export default function App({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <Provider store={store}>
        {children}    
    </Provider>
  );
}