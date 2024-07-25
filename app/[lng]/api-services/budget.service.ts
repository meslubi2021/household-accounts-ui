import axios from 'axios';
import { Budget } from '../models';

export const budgetService = {
    getByUserIdMonth: async (userId: string, budgetMonth: string):Promise<Budget | undefined> => {
        try{
            // const { data } = await axios.get(`localhost.../${userId}/${budgetMonth}`);
            // return data;
            return mockData[budgetMonth];
        }catch(err){

        }
    }
}

const mockData:any = 
    {
        "2024-07":  {
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
        },
        "2024-06":  {
            userId: 'user-id',
            budgetMonth: '2024-07',
            totalAmount: 6245.52,
            items: [
                {
                    source: "skillstorm",
                    amount: 2900.00
                },
                {
                    source: "impexGLS",
                    amount: 3345.52
                }
            ]
        }
    }