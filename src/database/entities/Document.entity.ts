import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTable } from './BaseTable';
import { AppFile } from './AppFile.entity';
import { Inventory } from './Inventory.entity';

@Entity({ schema: 'easyinventory', name: 'document' })
export class Document extends BaseTable {
  @Column()
  label: string;

  @Column({ name: 'app_file_id' })
  appFileId: number;

  @Column({ name: 'inventory_id' })
  inventoryId: number;

  @ManyToOne(() => AppFile, (article) => article.tDocument)
  @JoinColumn({ name: 'app_file_id' })
  oAppFile: AppFile;

  @ManyToOne(() => Inventory, (inventory) => inventory.tDocument)
  @JoinColumn({ name: 'inventory_id' })
  oInventory: Inventory;
}
