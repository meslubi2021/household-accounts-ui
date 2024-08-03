"use client"

import { useTranslation } from '../../i18n/client';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const router = useRouter();
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        // const res = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ username, password })
        // });
    
        // if (res.ok) {
        //   router.push('/protected');
        // } else {
        //   console.error('Failed to login');
        // }
    };

    return (<>
       
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
    );
}