import axios from 'axios';
import { Transaction, TransactionType, AddTransactionPayload, PatchTransactionPayload } from '../models';

export const transactionService = {
  /**
   * 
   * @param userId mongoDB ObjectId
   * @param expenseMonth string 2024-07
   * @returns 
   */
    getExpenseByUserId: async (userId: string, year: string, month: string):Promise<Transaction[] | undefined> => {
        try{
            const { data } = await axios.get(`http://localhost:3001/transaction/${userId}?type=expense&year=${year}&month=${month}`);
            return data;
        }catch(err){
          throw err;
        }
    },
    createTransaction: async (payload: AddTransactionPayload) => {
      try{
        const { data } = await axios.post(`http://localhost:3001/transaction`, payload);
        return data;
      }catch(err){
        throw err;
      }
    },
    updateTransaction: async (transactionId: string, payload: PatchTransactionPayload) => {
      try{
        const { data } = await axios.patch(`http://localhost:3001/transaction/${transactionId}`, payload);
        return data;
      }catch(err){
        throw err;
      }
    },
    deleteTransaction: async (transactionId: string) => {
      try{
        const { data } = await axios.delete(`http://localhost:3001/transaction/${transactionId}`);
        return data;
      }catch(err){
        throw err;
      }
    }
}