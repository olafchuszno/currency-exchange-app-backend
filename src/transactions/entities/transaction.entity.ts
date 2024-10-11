export interface TransactionEntity {
  id: number;
  transaction_eur_amount: number;
  transaction_pln_amount: number;
  currenty_exchange_rate: number;
  updatedAt: string;
  createdAt: string;
}
