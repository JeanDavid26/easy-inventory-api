import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTable } from './BaseTable';
import { TransactionTypeEnum } from '../@models/transaction-type.enum';
import { TransactionArticleQuantityHistory } from '../@models/transaction-article-quantity-history.interface';
import { Inventory } from './Inventory.entity';

@Entity({ schema: 'easyinventory', name: 'transaction' })
export class Transaction extends BaseTable {
  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'inventory_id' })
  inventoryId: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column({ name: 'value', type: 'double precision' })
  value: number;

  @Column({ name: 'j_article_quantity', type: 'jsonb', nullable: true })
  jArticleQuantity: TransactionArticleQuantityHistory[];

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'inventory_id' })
  oInventory: Inventory;
}
