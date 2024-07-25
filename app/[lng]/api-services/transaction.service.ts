import axios from 'axios';
import { Transaction, TransactionType } from '../models';

export const transactionService = {
  /**
   * 
   * @param userId mongoDB ObjectId
   * @param expenseMonth string 2024-07
   * @returns 
   */
    getExpenseByUserIdMonth: async (userId: string, expenseMonth: string):Promise<Transaction[] | undefined> => {
        try{
            // const { data } = await axios.get(`localhost.../${userId}/${expenseMonth}`);
            // return data;
            
            return mockData[expenseMonth];
        }catch(err){

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
                category: 'Dine out', note: '대박 왕 만두', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card'
            }
        ]
    },
    {
      date: 'Jul 15, 2024',
      dateStr: '2024-07-15',
      items: [
        { category: 'Grocery', note: 'H-mart', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 21, 2024',
      dateStr: '2024-07-21',
      items: [
        { category: 'Dine out', note: '해남', amount: 90.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: '이산', amount: 105.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 22, 2024',
      dateStr: '2024-07-22',
      items: [
        { category: 'Dine out', note: 'Daebak', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jul 23, 2024',
      dateStr: '2024-07-23',
      items: [
        { category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: "Burgerking", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
  ],
  "2024-06": [
    {
        date: 'Jun 5, 2024',
        dateStr: '2024-06-05',
        items: [
            {
                category: 'Dine out', note: 'Burgerking', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card'
            }
        ]
    },
    {
      date: 'Jun 7, 2024',
      dateStr: '2024-06-07',
      items: [
        { category: 'Utilities', note: "Phone", amount: 125.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: "한국집", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 13, 2024',
      dateStr: '2024-06-13',
      items: [
        { category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: "대박 왕 만두", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 15, 2024',
      dateStr: '2024-06-15',
      items: [
        { category: 'Grocery', note: 'H-mart', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 21, 2024',
      dateStr: '2024-06-21',
      items: [
        { category: 'Dine out', note: '해남', amount: 90.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: '이산', amount: 105.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 22, 2024',
      dateStr: '2024-06-22',
      items: [
        { category: 'Dine out', note: 'Daebak', amount: 25.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
    {
      date: 'Jun 23, 2024',
      dateStr: '2024-06-23',
      items: [
        { category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
        { category: 'Dine out', note: "Burgerking", amount: 200.0, type: 'expense'  as TransactionType, paymentMethod: 'Credit Card' },
      ],
    },
  ]
}