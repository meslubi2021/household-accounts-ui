import axios from 'axios';
import { Category, UpdateCategory } from '../models';

export const categoryService = {
    getByUserId: async (userId: string):Promise<string[] | undefined> => {
        try{
            // const { data } = await axios.get(`localhost.../${userId}/${budgetMonth}`);
            const data:Category[] = [
                {
                    name:"Dine-out"
                },
                {
                    name:"Grocery"
                },
                {
                    name:"Utilities"
                }
            ]
            return ["Dine-out", "Grocery", "Utilities"];
        }catch(err){

        }
    },
    updateExpense: async (categoryId: string, payload: UpdateCategory) => {
      try{
        // const { data } = await axios.patch(`localhost.../${expenseId}`, payload);
        // return data;
      }catch(err){
        throw err;
      }
    },
    deleteCategory: async (categoryId: string) => {
      try{
        // const { data } = await axios.delete(`localhost.../${categoryId}`);
        // return data;
      }catch(err){
        throw err;
      }
    }
}