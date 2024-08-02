import axios from 'axios';
import { Budget } from '../models';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;

export const budgetService = {
    getByUserId: async (userId: string, year: string, month: string):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/budget/${userId}?year=${year}&month=${month}`);            
            return data[0];            
        }catch(err){
            console.log(err);
        }
    }
}