import axios from 'axios';

export const budgetService = {
    getByUserId: async (userId: string, budgetDate: string) => {
        try{
            // const { data } = await axios.get(`localhost.../${userId}/${budgetDate}`);
            const data = {
                    userId: 'user-id',
                    budgetDate: '2024-07',
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