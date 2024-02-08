import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;

  @DeleteDateColumn({ name: 'delete_date' })
  deleteDate: Date;
}
