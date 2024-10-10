import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class TransactionModel extends Model<TransactionModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    primaryKey: true,
  })
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
    defaultValue: () => new Date(),
  })
  timestamp: Date;
}
