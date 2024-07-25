export type Budget = {
    userId: string;
    budgetDate: string;
    totalAmount: number;
    items: {
        source: string;
        amount: number;
    }[];
}