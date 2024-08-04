import axios from 'axios';
import { User } from '../models';
const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
export const userService = {
    login: async (payload: { email: string, password: string }):Promise<{userInfo: User, accessToken: string}> => {
        try{
            const { data } = await axios.post(`${userServiceUrl}/auth/login`, payload);
            return data;
        }catch(err){
          throw err;
        }
    }
}