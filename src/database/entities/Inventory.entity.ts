import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from './BaseTable';
import { InventoryTypeEnum } from '../@models/inventory-type.enum';
import { ArticleQuantity } from './ArticleQuantity.entity';
import { Transaction } from './Transaction.entity';
import { Document } from './Document.entity';

@Entity({ schema: 'easyinventory', name: 'inventory' })
export class Inventory extends BaseTable {
  @Column()
  label: string;

  @Column({ type: 'enum', enum: InventoryTypeEnum })
  type: InventoryTypeEnum;

  @OneToMany(() => Transaction, (transaction) => transaction.oInventory)
  tTransaction: Transaction[];

  @OneToMany(
    () => ArticleQuantity,
    (articleQuantity) => articleQuantity.oInventory,
  )
  tArticleQuantity: ArticleQuantity[];

  @OneToMany(() => Document, (document) => document.oInventory)
  tDocument: Document[];

  value?: number;
  quantity?: number;
}
