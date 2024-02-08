import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionManagerService } from 'src/database/db-manager/transaction-manager/transaction-manager.service';
import { AddTransactionDto } from './dto/add-transaction.dto';
import { Transaction } from 'src/database/entities/Transaction.entity';
import { TransactionTypeEnum } from 'src/database/@models/transaction-type.enum';
import { ArticleQuantityManagerService } from 'src/database/db-manager/article-quantity-manager/article-quantity-manager.service';
import { TransactionArticleQuantityHistory } from 'src/database/@models/transaction-article-quantity-history.interface';
import { ArticleManagerService } from 'src/database/db-manager/article-manager/article-manager.service';

@Injectable()
export class TransactionService {
  constructor(
    private _transactionManagerService: TransactionManagerService,
    private _articleQuantityManagerService: ArticleQuantityManagerService,
    private _articleManagerService: ArticleManagerService,
  ) {}

  public async addTransaction(data: AddTransactionDto): Promise<Transaction> {
    const jArticleQuantity: TransactionArticleQuantityHistory[] = [];
    for (const articleQuantity of data.tArticleQuantity) {
      const oArticle = await this._articleManagerService.get(
        articleQuantity.articleId,
      );
      jArticleQuantity.push({ ...articleQuantity, oArticle });
    }

    const oTransaction = await this._transactionManagerService.insert({
      date: data.date,
      inventoryId: data.inventoryId,
      jArticleQuantity,
      type: data.type,
      value: this._valueArticleQuantity(jArticleQuantity),
    });
    if (data.type === TransactionTypeEnum.IMPORT) {
      for (const articleQuantityItem of jArticleQuantity) {
        const oArticleQuantiteStock =
          await this._articleQuantityManagerService.get(
            data.inventoryId,
            articleQuantityItem.articleId,
          );
        console.log();
        if (oArticleQuantiteStock) {
          await this._articleQuantityManagerService.update(
            data.inventoryId,
            articleQuantityItem.articleId,
            {
              quantity:
                oArticleQuantiteStock.quantity + articleQuantityItem.quantity,
            },
          );
        } else {
          await this._articleQuantityManagerService.insert({
            inventoryId: data.inventoryId,
            articleId: articleQuantityItem.articleId,
            quantity: articleQuantityItem.quantity,
          });
        }
      }
    } else if (data.type === TransactionTypeEnum.VENTE) {
      for (const articleQuantityItem of jArticleQuantity) {
        const oArticleQuantiteStock =
          await this._articleQuantityManagerService.get(
            data.inventoryId,
            articleQuantityItem.articleId,
          );

        if (oArticleQuantiteStock) {
          await this._articleQuantityManagerService.update(
            data.inventoryId,
            articleQuantityItem.articleId,
            {
              quantity:
                oArticleQuantiteStock.quantity - articleQuantityItem.quantity,
            },
          );
        } else {
          throw new BadRequestException(
            'Vous ne possedez pas cette article pour le vendre',
          );
        }
      }
    }

    return oTransaction;
  }

  private _valueArticleQuantity(
    tArticleQuantity: TransactionArticleQuantityHistory[],
  ): number {
    let valeur = 0;
    for (const articleQuantity of tArticleQuantity) {
      valeur =
        valeur + articleQuantity.oArticle.unitPrice * articleQuantity.quantity;
    }
    return valeur;
  }
}
