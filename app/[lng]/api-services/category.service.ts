import axios from 'axios';
import { Category } from '../models';

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
    }
}