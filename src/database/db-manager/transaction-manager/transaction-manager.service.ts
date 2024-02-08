import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/database/entities/Transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionManagerService {
  constructor(
    @InjectRepository(Transaction) private _repo: Repository<Transaction>,
  ) {}

  public async get(id: number): Promise<Transaction> {
    const transaction = await this._repo.findOne({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }
    return transaction;
  }

  public async list(): Promise<Transaction[]> {
    return this._repo.find({
      relations: ['oInventory'],
    });
  }

  public async insert(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = this._repo.create(data);
    return this._repo.save(transaction);
  }

  public async update(
    id: number,
    data: Partial<Transaction>,
  ): Promise<Transaction> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async delete(id: number): Promise<Transaction> {
    await this.get(id);
    const transaction: Partial<Transaction> = {
      id,
      deleteDate: new Date(),
    };
    return this._repo.save(transaction);
  }
}
