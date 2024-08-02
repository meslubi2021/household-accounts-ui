export type TransactionType = 'income' | 'expense'

export type Transaction = {
  _id: string; // 2024-07-07
  totalAmount: number
  transactions: {
    _id: string;
    userId: string;
    date: string;
    type: TransactionType;
    amount: number;
    category: string;
    note?: string;
    paymentMethod: string;
  }[];
}

export type AddTransactionPayload = {
  userId: string;
  date: string;
  amount: number;
  category: string;
  note?: string;
  fixedExpense?: string; // none, dailly weekly, annually
  type: TransactionType;
  paymentMethod?: string;
}

export type PatchTransactionPayload = {
  category?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  fixedExpense?: string; // none, dailly weekly, annually
  paymentMethod?: string;
}
