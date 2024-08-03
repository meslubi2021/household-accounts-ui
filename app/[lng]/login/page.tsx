"use client"

import { useTranslation } from '../../i18n/client';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { MSLoginButton, GoogleLoginButton } from '../components/buttons';
import img from '/public/assets/icons/icon-128x128.png';
import Image from 'next/image';
import { CustomInput } from '../components';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log({email, password})
    };

    function onChange(value:string, type: string) {
      if(type === 'email'){
        setEmail(value);
      }else{
        setPassword(value);
      }
    }
    return (<>
       
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[25rem] p-8 space-y-4 bg-white rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center">
          <Image alt="logo" src={img} width={"72"} />
        </div>
        <CustomInput type={"email"} placeholder={t("general.email")} onChange={onChange} />
        <CustomInput type={"password"} placeholder={t("general.password")} onChange={onChange} />
        <button
              onClick={handleSubmit}
              className="block w-full px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md hover:bg-red-400 focus:outline-none"
            >
              {t('auth.login')}
        </button>
        <div className="flex items-center justify-between mt-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="space-y-4">
            <MSLoginButton /> 
            <GoogleLoginButton />
        </div>
      </div>
    </div>
    </>
    );
}