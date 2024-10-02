'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { userService } from '@/app/lib/api-services'
import { Button } from 'react-component-tailwindcss';

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
        <Button
          onClick={onClick}
          loading={isLoggingin} 
          variant='secondary' color='pink'
        >
            <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 23 23"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
                <span className='text-sm text-microsoft-text-gray tracking-wider ml-3' style={{color: "black"}}>Continue with Microsoft</span>
            </div>
        </Button>
  </>)
}