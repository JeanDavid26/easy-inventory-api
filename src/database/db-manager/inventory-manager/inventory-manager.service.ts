import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/database/entities/Inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryManagerService {
  constructor(
    @InjectRepository(Inventory) private _repo: Repository<Inventory>,
  ) {}

  public async get(id: number): Promise<Inventory> {
    const qb = this._repo
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.tTransaction', 'ttranaction')
      .leftJoinAndSelect(
        'ttranaction.tArticleQuantityTransaction',
        'tarticlequantitytransaction',
      )
      .leftJoinAndSelect('inventory.tArticleQuantity', 'tarticlequantity')
      .leftJoinAndSelect(
        'tarticlequantity.oArticle',
        'tarticlequantity_article',
      )
      .leftJoinAndSelect(
        'tarticlequantity_article.oCategory',
        'tarticlequantity_category',
      )
      .where('inventory.id = :id', { id });

    return qb.getOne();
  }

  public async list(): Promise<Inventory[]> {
    const qb = this._repo
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.tTransaction', 'ttranaction')
      .leftJoinAndSelect('inventory.tArticleQuantity', 'tarticlequantity')
      .leftJoinAndSelect(
        'tarticlequantity.oArticle',
        'tarticlequantity_article',
      )
      .leftJoinAndSelect(
        'tarticlequantity_article.oCategory',
        'tarticlequantity_category',
      );

    return qb.getMany();
  }

  public async insert(data: Partial<Inventory>): Promise<Inventory> {
    return this._repo.save(data);
  }

  public async update(
    id: number,
    data: Partial<Inventory>,
  ): Promise<Inventory> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async delete(id: number): Promise<Inventory> {
    await this.get(id);
    const stock: Partial<Inventory> = {
      id,
      deleteDate: new Date(),
    };
    return this._repo.save(stock);
  }
}
