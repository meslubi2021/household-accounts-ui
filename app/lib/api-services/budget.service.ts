import axios from 'axios';
import { Budget } from '@/app/lib/models';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;

export const budgetService = {
    getByUserId: async (userId: string, year: string, month: string):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/budget/${userId}/user?year=${year}&month=${month}`);            
            return data[0] || [];            
        }catch(err){
            console.log(err);
        }
    },
    createBudget: async (payload: {userId:string, date:string, amount: number, category:string}):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.post(`${coreServiceUrl}/budget`, payload);            
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    updateBudget: async (budgetId:string, amount: number):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.patch(`${coreServiceUrl}/budget/${budgetId}`, {amount});            
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}