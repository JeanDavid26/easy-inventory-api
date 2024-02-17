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
    const qb = this._repo
      .createQueryBuilder('transaction')
      .leftJoinAndSelect(
        'transaction.tArticleQuantityTransaction',
        'tarticlequantity',
      )
      .leftJoinAndSelect(
        'tarticlequantity.oArticle',
        'tarticlequantity_article',
      )
      .leftJoinAndSelect(
        'tarticlequantity_article.oCategory',
        'tarticlequantity_category',
      )
      .where('transaction.id = :id', { id });

    return qb.getOne();
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
    const transaction = await this.get(id);
    if (!transaction) {
      throw new BadRequestException('Transaction pas trouvé');
    }
    const transactionDeleted: Partial<Transaction> = {
      id,
      deleteDate: new Date(),
    };
    return this._repo.save(transactionDeleted);
  }
}
