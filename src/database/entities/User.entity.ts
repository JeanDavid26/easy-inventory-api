import { Column, Entity } from 'typeorm';
import { BaseTable } from './BaseTable';

@Entity({ schema: 'easyinventory', name: 'user' })
export class User extends BaseTable {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password' })
  password: string;
}
