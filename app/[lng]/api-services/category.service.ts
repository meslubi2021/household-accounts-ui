import axios from 'axios';
import { Category, UpdateCategory } from '../models';

export const categoryService = {
    getByUserId: async (userId: string):Promise<Category[] | undefined> => {
        try{
            const { data } = await axios.get(`http://localhost:3001/category/${userId}`);
            return data;
        }catch(err){

        }
    },
    updateExpense: async (categoryId: string, payload: UpdateCategory) => {
      try{
        // const { data } = await axios.patch(`http://localhost:3001/${expenseId}`, payload);
        // return data;
      }catch(err){
        throw err;
      }
    },
    deleteCategory: async (categoryId: string) => {
      try{
        // const { data } = await axios.delete(`http://localhost:3001/${categoryId}`);
        // return data;
      }catch(err){
        throw err;
      }
    }
}