import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  id: number;

  @Column
  transaction_eur_amount: number;

  @Column
  transaction_pln_amount: number;

  @Column
  currenty_exchange_rate: number;

  @Column
  timestamp: string;
}
