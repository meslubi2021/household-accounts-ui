export type TransactionType = 'income' | 'expense'

export type Transaction = {
  date: string;
  dateStr: string;
  items: {
    category: string;
    note?: string;
    amount: number;
    type: TransactionType;
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