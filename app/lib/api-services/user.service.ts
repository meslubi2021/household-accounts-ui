import axios from 'axios';
import { User } from '@/app/lib/models';
const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
export const userService = {
    login: async (payload: { email: string, password: string }):Promise<{userInfo: User, accessToken: string}> => {
        try{
            const { data } = await axios.post(`${userServiceUrl}/auth/login`, payload);
            return data;
        }catch(err){
          throw err;
        }
    },
    msLogin: async () => {
        try{
            const { data } = await axios.get(`${userServiceUrl}/auth/login/ms`);
            return data;
        }catch(err){
            throw err;
        }
    },
    googleLogin: async () => {
        try{
            const { data } = await axios.get(`${userServiceUrl}/auth/login/google`);
            return data;
        }catch(err){
            throw err;
        }
    }
}