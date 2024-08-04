import axios from 'axios';
import { Transaction, TransactionType, AddTransactionPayload, PatchTransactionPayload } from '../models';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;
export const transactionService = {
  /**
   * 
   * @param userId mongoDB ObjectId
   * @param expenseMonth string 2024-07
   * @returns 
   */
    getExpenseByUserId: async (userId: string, year: string, month: string, groupBy?: string):Promise<Transaction[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/transaction/${userId}?type=expense&year=${year}&month=${month}&groupBy=${groupBy}`);
            return data;
        }catch(err){
          throw err;
        }
    },
    getIncomeByUserId: async (userId: string, year: string, month: string):Promise<Transaction[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/transaction/${userId}?type=income&year=${year}&month=${month}`);
            return data;
        }catch(err){
          throw err;
        }
    },
    createTransaction: async (payload: AddTransactionPayload) => {
      try{
        const { data } = await axios.post(`${coreServiceUrl}/transaction`, payload);
        return data;
      }catch(err){
        throw err;
      }
    },
    updateTransaction: async (transactionId: string, payload: PatchTransactionPayload) => {
      try{
        const { data } = await axios.patch(`${coreServiceUrl}/transaction/${transactionId}`, payload);
        return data;
      }catch(err){
        throw err;
      }
    },
    deleteTransaction: async (transactionId: string) => {
      try{
        const { data } = await axios.delete(`${coreServiceUrl}/transaction/${transactionId}`);
        return data;
      }catch(err){
        throw err;
      }
    }
}