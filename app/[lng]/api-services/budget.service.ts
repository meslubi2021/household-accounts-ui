import axios from 'axios';
import { Budget } from '../models';

export const budgetService = {
    getByUserIdMonth: async (userId: string, budgetMonth: string):Promise<Budget | undefined> => {
        try{
            const { data } = await axios.get(`localhost.../${userId}/${budgetMonth}`);
            return data;            
        }catch(err){

        }
    }
}