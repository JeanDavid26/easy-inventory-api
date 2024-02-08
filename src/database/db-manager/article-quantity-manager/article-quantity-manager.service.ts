import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleQuantity } from 'src/database/entities/ArticleQuantity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleQuantityManagerService {
  constructor(
    @InjectRepository(ArticleQuantity)
    private _repo: Repository<ArticleQuantity>,
  ) {}

  public async get(
    inventoryId: number,
    articleId: number,
  ): Promise<ArticleQuantity> {
    const articleQuantity = await this._repo.findOne({
      where: {
        inventoryId,
        articleId,
      },
      relations: ['oArticle', 'oArticle.oCategory'],
    });

    if (!articleQuantity) {
      return null;
    }
    return articleQuantity;
  }

  public async insert(
    oDonnee: Partial<ArticleQuantity>,
  ): Promise<ArticleQuantity> {
    const reference = this._repo.create(oDonnee);
    return this._repo.save(reference);
  }

  public async update(
    inventoryId: number,
    articleId: number,
    oDonnee: Partial<ArticleQuantity>,
  ): Promise<ArticleQuantity> {
    oDonnee.articleId = articleId;
    oDonnee.inventoryId = inventoryId;
    return this._repo.save(oDonnee);
  }

  public async delete(
    inventoryId: number,
    articleId: number,
  ): Promise<ArticleQuantity> {
    await this.get(inventoryId, articleId);
    return this._repo.save({
      inventoryId,
      articleId,
      deleteDate: new Date(),
    });
  }
}
