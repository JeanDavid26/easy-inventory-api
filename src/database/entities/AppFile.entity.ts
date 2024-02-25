import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTable } from './BaseTable';
import { Document } from './Document.entity';

@Entity({ schema: 'easyinventory', name: 'app_file' })
export class AppFile extends BaseTable {
  @Column({ name: 'originalname' })
  originalName: string;

  @Column({ name: 'path' })
  path: string;

  @Column({ name: 'content_type' })
  contentType: string;

  @Column({ name: 'size' })
  size: number;

  @OneToMany(() => Document, (document) => document.appFileId)
  tDocument: Document[];
}
