"use client"

import { useTranslation } from '../../i18n/client';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { MSLoginButton, GoogleLoginButton } from '../components/buttons';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
    };

    return (<>
       
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Mobile number or email address:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              CONTINUE
            </button>
          </div>
        </form>
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