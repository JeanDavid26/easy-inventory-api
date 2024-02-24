import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionManagerService } from 'src/database/db-manager/transaction-manager/transaction-manager.service';
import { AddTransactionDto } from './dto/add-transaction.dto';
import { Transaction } from 'src/database/entities/Transaction.entity';
import { TransactionTypeEnum } from 'src/database/@models/transaction-type.enum';
import { ArticleQuantityManagerService } from 'src/database/db-manager/article-quantity-manager/article-quantity-manager.service';
import { TransactionArticleQuantityHistory } from 'src/database/@models/transaction-article-quantity-history.interface';
import { ArticleManagerService } from 'src/database/db-manager/article-manager/article-manager.service';
import { ArticleQuantityTransactionManagerService } from 'src/database/db-manager/article-quantity-transaction-manager/article-quantity-transaction-manager.service';
import { ArticleQuantityTransaction } from 'src/database/entities/ArticleQuantityTransaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private _transactionManagerService: TransactionManagerService,
    private _articleQuantityTransactionManagerService: ArticleQuantityTransactionManagerService,
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
      type: data.type,
    });
    for (const articleQuantityItem of jArticleQuantity) {
      await this._articleQuantityTransactionManagerService.insert({
        articleId: articleQuantityItem.articleId,
        transactionId: oTransaction.id,
        quantity: articleQuantityItem.quantity,
        unitPrice: articleQuantityItem.oArticle.unitPrice,
      });
      const oArticleQuantiteStock =
        await this._articleQuantityManagerService.get(
          data.inventoryId,
          articleQuantityItem.articleId,
        );
      if (data.type === TransactionTypeEnum.IMPORT) {
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
      } else if (data.type === TransactionTypeEnum.VENTE) {
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

  public async listTransaction(): Promise<Transaction[]> {
    const tTransaction = await this._transactionManagerService.list();
    for (const transaction of tTransaction) {
      const valueQuantity = this._valueQuantityTransaction(
        transaction.tArticleQuantityTransaction,
      );
      transaction.value = valueQuantity.value;
      transaction.quantity = valueQuantity.quantity;
    }
    return tTransaction;
  }

  public async getTransaction(id: number): Promise<Transaction> {
    const transaction = await this._transactionManagerService.get(id);
    const valueQuantity = this._valueQuantityTransaction(
      transaction.tArticleQuantityTransaction,
    );
    transaction.value = valueQuantity.value;
    transaction.quantity = valueQuantity.quantity;
    return transaction;
  }

  private _valueQuantityTransaction(
    tArticleQuantity: ArticleQuantityTransaction[],
  ): {
    value: number;
    quantity: number;
  } {
    let value = 0;
    let quantity = 0;
    if (tArticleQuantity.length > 0) {
      for (const articleQuantity of tArticleQuantity) {
        value += articleQuantity.quantity * articleQuantity.unitPrice;
        quantity += articleQuantity.quantity;
      }
    }
    return { value, quantity };
  }
}
