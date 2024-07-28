export type TransactionType = 'income' | 'expense'

export type Transaction = {
  _id: string;
  date: string;
  dateStr: string;
  items: {
    _id: string;
    dateStr: string;
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

export type PatchExpensePayload = {
  category?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  paymentMethod?: string;
}
