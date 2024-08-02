import axios from 'axios';
import { Category, CategoryPayload } from '../models';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;

export const categoryService = {
    getByUserId: async (userId: string):Promise<Category[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/category/${userId}`);
            return data;
        }catch(err){

        }
    },
    create: async (userId: string, payload: CategoryPayload) => {
      try{
        const { data } = await axios.post(`${coreServiceUrl}/category`, {...payload, userId});
        return data;
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