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

export type AddExpensePayload = {
  dateStr: string;
  item: {
    category: string;
    note?: string;
    amount: number;
    paymentMethod: string;
  }
}

export type PatchExpensePayload = {
  category?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  paymentMethod?: string;
}
