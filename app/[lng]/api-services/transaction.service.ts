import axios from 'axios';
import { Transaction, TransactionType, AddExpensePayload, PatchExpensePayload } from '../models';

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
    createExpense: async (userId: string, payload: AddExpensePayload) => {
      try{
        // const { data } = await axios.post(`http://localhost:3001/${userId}`, payload);
        // return data;
      }catch(err){
        throw err;
      }
    },
    updateExpense: async (expenseId: string, payload: PatchExpensePayload) => {
      try{
        // const { data } = await axios.patch(`http://localhost:3001/${expenseId}`, payload);
        // return data;
      }catch(err){
        throw err;
      }
    },
    deleteExpense: async (expenseId: string) => {
      try{
        // const { data } = await axios.delete(`http://localhost:3001/${expenseId}`);
        // return data;
      }catch(err){
        throw err;
      }
    }
}

const mockData:any = {
  "2024-07": [
    {
        date: 'Jul 10, 2024',
        dateStr: '2024-07-10',
        items: [
            {
              _id:"abc-123-abc-111", dateStr: '2024-07-10', category: 'Dine out', note: '대박 왕 만두', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card'
            }
        ]
    },
    {
      date: 'Jul 15, 2024',
      dateStr: '2024-07-15',
      items: [
        { _id:"abc-123-abc-112", dateStr: '2024-07-15', category: 'Grocery', note: 'H-mart', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 21, 2024',
      dateStr: '2024-07-21',
      items: [
        { _id:"abc-123-abc-113", dateStr: '2024-07-21', category: 'Dine out', note: '해남', amount: 90.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { _id:"abc-123-abc-114", dateStr: '2024-07-21',  category: 'Dine out', note: '이산', amount: 105.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 22, 2024',
      dateStr: '2024-07-22',
      items: [
        { _id:"abc-123-abc-114", dateStr: '2024-07-22',  category: 'Dine out', note: 'Daebak', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 23, 2024',
      dateStr: '2024-07-23',
      items: [
        { _id:"abc-123-abc-115", dateStr: '2024-07-23', category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { _id:"abc-123-abc-116", dateStr: '2024-07-23', category: 'Dine out', note: "Burgerking", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
  ],
  "2024-06": [
    {
        date: 'Jun 5, 2024',
        dateStr: '2024-06-05',
        items: [
            {
              _id:"abc-123-abc-117", dateStr: '2024-06-05', category: 'Dine out', note: 'Burgerking', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card'
            }
        ]
    },
    {
      date: 'Jun 7, 2024',
      dateStr: '2024-06-07',
      items: [
        { _id:"abc-123-abc-118", dateStr: '2024-06-07',category: 'Utilities', note: "Phone", amount: 125.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        {_id:"abc-123-abc-119", dateStr: '2024-06-07', category: 'Dine out', note: "한국집", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 13, 2024',
      dateStr: '2024-06-13',
      items: [
        {_id:"abc-123-abc-120", dateStr: '2024-06-13', category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        {_id:"abc-123-abc-121", dateStr: '2024-06-13', category: 'Dine out', note: "대박 왕 만두", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 15, 2024',
      dateStr: '2024-06-15',
      items: [
        {_id:"abc-123-abc-122", dateStr: '2024-06-15',  category: 'Grocery', note: 'H-mart', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 21, 2024',
      dateStr: '2024-06-21',
      items: [
        { _id:"abc-123-abc-123", dateStr: '2024-06-21', category: 'Dine out', note: '해남', amount: 90.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { _id:"abc-123-abc-124", dateStr: '2024-06-21', category: 'Dine out', note: '이산', amount: 105.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 22, 2024',
      dateStr: '2024-06-22',
      items: [
        { _id:"abc-123-abc-125", dateStr: '2024-06-22', category: 'Dine out', note: 'Daebak', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 23, 2024',
      dateStr: '2024-06-23',
      items: [
        { _id:"abc-123-abc-126", dateStr: '2024-06-23',  category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { _id:"abc-123-abc-127", dateStr: '2024-06-23',  category: 'Dine out', note: "Burgerking", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
  ]
}