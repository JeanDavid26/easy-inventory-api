import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleQuantityTransaction } from 'src/database/entities/ArticleQuantityTransaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleQuantityTransactionManagerService {
  constructor(
    @InjectRepository(ArticleQuantityTransaction)
    private _repo: Repository<ArticleQuantityTransaction>,
  ) {}

  public async get(
    transactionId: number,
    articleId: number,
  ): Promise<ArticleQuantityTransaction> {
    const articleQuantity = await this._repo.findOne({
      where: {
        transactionId,
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
    oDonnee: Partial<ArticleQuantityTransaction>,
  ): Promise<ArticleQuantityTransaction> {
    const reference = this._repo.create(oDonnee);
    return this._repo.save(reference);
  }

  public async update(
    transactionId: number,
    articleId: number,
    data: Partial<ArticleQuantityTransaction>,
  ): Promise<ArticleQuantityTransaction> {
    data.articleId = articleId;
    data.transactionId = transactionId;
    return this._repo.save(data);
  }

  public async delete(
    transactionId: number,
    articleId: number,
  ): Promise<ArticleQuantityTransaction> {
    await this.get(transactionId, articleId);
    return this._repo.save({
      transactionId,
      articleId,
      deleteDate: new Date(),
    });
  }
}
