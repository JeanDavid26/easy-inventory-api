import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Article } from './Article.entity';
import { Transaction } from './Transaction.entity';

@Entity({ schema: 'easyinventory', name: 'article_quantity_transaction' })
export class ArticleQuantityTransaction {
  @PrimaryColumn({ name: 'article_id' })
  articleId: number;

  @PrimaryColumn({ name: 'transaction_id' })
  transactionId: number;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => Article, (article) => article.tArticleQuantity)
  @JoinColumn({ name: 'article_id' })
  oArticle: Article;

  @ManyToOne(
    () => Transaction,
    (transation) => transation.tArticleQuantityTransaction,
  )
  @JoinColumn({ name: 'transaction_id' })
  oTransaction: Transaction;
}
