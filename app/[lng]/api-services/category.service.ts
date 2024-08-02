import axios from 'axios';
import { Category, UpdateCategory } from '../models';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;

export const categoryService = {
    getByUserId: async (userId: string):Promise<Category[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/category/${userId}`);
            return data;
        }catch(err){

        }
    },
    updateExpense: async (categoryId: string, payload: UpdateCategory) => {
      try{
        // const { data } = await axios.patch(`${coreServiceUrl}/${expenseId}`, payload);
        // return data;
      }catch(err){
        throw err;
      }
    },
    deleteCategory: async (categoryId: string) => {
      try{
        // const { data } = await axios.delete(`${coreServiceUrl}/${categoryId}`);
        // return data;
      }catch(err){
        throw err;
      }
    }
}