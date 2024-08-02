export type TransactionType = 'income' | 'expense'
export type FixedExpenseType = "does_not_repeat" | "every_day" | "every_week" | "every_month" | "every_year"

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
    fixedExpense: FixedExpenseType;
    paymentMethod: string;
  }[];
}

export type AddTransactionPayload = {
  userId: string;
  date: string;
  amount: number;
  category: string;
  note?: string;
  fixedExpense?: FixedExpenseType;
  type: TransactionType;
  paymentMethod?: string;
}

export type PatchTransactionPayload = {
  category?: string;
  note?: string;
  amount?: number;
  type?: TransactionType;
  fixedExpense?: FixedExpenseType;
  paymentMethod?: string;
}
