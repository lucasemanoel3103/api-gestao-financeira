export class Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'OUTCOME' | 'INVESTMENT';
  category: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
