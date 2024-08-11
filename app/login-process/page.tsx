"use client"

import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingSpinner } from '../[lng]/components/shared'
import { useCookies } from 'react-cookie'
import '@/app/ui/sass/index.scss';

function LoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, setCookie] = useCookies(["userInfo"]);

  useEffect(() => {
    handleCode();
  }, [])
  async function handleCode() {
    const accessToken = searchParams.get('accessToken');
    const userInfo = searchParams.get('userInfo');
    setCookie("userInfo", {accessToken, userInfo}, { path: '/', maxAge: 3600 }); // maxAge - seconds
    userInfo && sessionStorage.setItem('userInfo', userInfo);
    setTimeout(() => {
      router.push(`/calendar`);
    }, 300)
  }

    return (<>
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <LoadingSpinner />
        <span className="mt-4">Authenticating...</span>
      </div>
    </div>
    </>
    );
}

export default function Index() {
  return(
    <Suspense fallback={<></>}>
      <LoginProcess />
    </Suspense>
  )
}