import axios from 'axios';
import { Budget } from '../models';

export const budgetService = {
    getByUserIdMonth: async (userId: string, budgetMonth: string):Promise<Budget | undefined> => {
        try{
            // const { data } = await axios.get(`localhost.../${userId}/${budgetMonth}`);
            const data = {
                    userId: 'user-id',
                    budgetMonth: '2024-07',
                    totalAmount: 6723.67,
                    items: [
                        {
                            source: "skillstorm",
                            amount: 3223.12
                        },
                        {
                            source: "impexGLS",
                            amount: 3500.52
                        }
                    ]
                }
            
            return data;
        }catch(err){

        }
    }
}