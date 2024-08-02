export type Budget = {
    _id: string;    
    totalAmount: number;
    budgets: {
        _id: string;
        amount: number;
        category: string;
        date: string;
    }[];
}