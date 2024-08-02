import axios from 'axios';
import { Budget } from '../models';

export const budgetService = {
    getByUserId: async (userId: string, year: string, month: string):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.get(`http://localhost:3001/budget/${userId}?year=${year}&month=${month}`);            
            return data[0];            
        }catch(err){
            console.log(err);
        }
    }
}