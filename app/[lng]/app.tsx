'use client'

import { Provider } from 'react-redux';
import { store } from "./utils/redux/store";

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