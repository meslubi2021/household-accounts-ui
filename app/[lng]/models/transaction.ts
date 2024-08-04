export type TransactionType = 'income' | 'expense'

export type TransactionItems = {
  _id: string;
  userId: string;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  fixedExpenseMonthly: boolean;
  paymentMethod: string;
}

export type Transaction = {
  _id: string; // 2024-07-07
  totalAmount: number
  transactions: TransactionItems[];
}

export type AddTransactionPayload = {
  userId: string;
  date: string;
  amount: number;
  category: string;
  note?: string;
  fixedExpenseMonthly?: boolean;
  type: TransactionType;
  paymentMethod?: string;
}

export type PatchTransactionPayload = {
  category?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  fixedExpenseMonthly?: boolean;
  paymentMethod?: string;
}
