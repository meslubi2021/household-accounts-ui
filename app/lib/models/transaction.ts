export type TransactionType = 'income' | 'expense' | 'investment'

export type TransactionItems = {
  _id: string;
  userId: string;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  subcategory: string;
  note?: string;
  pending: boolean;
  fixedExpenseMonthly: boolean;
  endDate?: string;
  fixedSeriesId?: string;
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
  subcategory?: string;
  note?: string;
  pending?: boolean;
  fixedExpenseMonthly?: boolean;
  endDate?: string;
  type: TransactionType;
  paymentMethod?: string;
}

export type PatchTransactionPayload = {
  category?: string;
  subcategory?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  pending?: boolean;
  fixedExpenseMonthly?: boolean;
  endDate?: string;
  fixedSeriesId?: string;
  paymentMethod?: string;
}
