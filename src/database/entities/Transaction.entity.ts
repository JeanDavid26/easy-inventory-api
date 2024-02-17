import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from './BaseTable';
import { TransactionTypeEnum } from '../@models/transaction-type.enum';
import { Inventory } from './Inventory.entity';
import { ArticleQuantityTransaction } from './ArticleQuantityTransaction.entity';

@Entity({ schema: 'easyinventory', name: 'transaction' })
export class Transaction extends BaseTable {
  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'inventory_id' })
  inventoryId: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @OneToMany(
    () => ArticleQuantityTransaction,
    (articleQuantity) => articleQuantity.oTransaction,
  )
  tArticleQuantityTransaction: ArticleQuantityTransaction[];

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'inventory_id' })
  oInventory: Inventory;

  value?: number;
  quantity?: number;
}
