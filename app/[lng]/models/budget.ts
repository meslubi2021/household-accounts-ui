export type Budget = {
    userId: string;
    budgetMonth: string;
    totalAmount: number;
    items: {
        source: string;
        amount: number;
    }[];
}