import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({ tableName: 'transactions' })
export class TransactionModel extends Model<TransactionModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
  })
  transaction_eur_amount: number;

  @Column({
    allowNull: false,
  })
  transaction_pln_amount: number;

  @Column({
    allowNull: false,
  })
  currenty_exchange_rate: number;

  @Column({
    allowNull: false,
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    type: 'timestamp',
  })
  updatedAt: Date;
}
