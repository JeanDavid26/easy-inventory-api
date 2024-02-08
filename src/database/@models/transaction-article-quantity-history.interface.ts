import { Article } from '../entities/Article.entity';

export interface TransactionArticleQuantityHistory {
  articleId: number;
  quantity: number;
  oArticle?: Article;
  value?: number;
}
