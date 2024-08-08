'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { userService } from '../../api-services'
import { LoadingSpinner } from '../../components/shared'

export const MSLoginButton = () => {
    const [ isLoggingin, setIsLoggingin ] = useState(false);
    const router = useRouter()

    const onClick = async () => {
        try{
            // Open MS Login page. and it will redirect to /login-process page
            setIsLoggingin(true);
            const res = await userService.msLogin();
            router.push(res.authorizeUrl);
        }catch(err){
            setIsLoggingin(false);
        }
    }
    return(<>
    {
        !isLoggingin
        ?
            <button
                aria-label='Continue with Microsoft'
                className='w-full flex justify-center items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3'
                onClick={onClick}
            >
                <div className='flex items-center justify-center bg-white w-9 h-9 rounded-l'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 23 23"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
                </div>
                <span className='text-sm text-microsoft-text-gray tracking-wider'>Continue with Microsoft</span>
            </button>
        :
            <button
                aria-label='Continue with Google'
                className='w-full justify-center h-[42px] flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3'>
                    <span><LoadingSpinner /></span>
            </button>
    }
  </>)
}