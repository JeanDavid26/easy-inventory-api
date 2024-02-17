import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Article } from './Article.entity';
import { Inventory } from './Inventory.entity';

@Entity({ schema: 'easyinventory', name: 'article_quantity' })
export class ArticleQuantity {
  @PrimaryColumn({ name: 'article_id' })
  articleId: number;

  @PrimaryColumn({ name: 'inventory_id' })
  inventoryId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Article, (article) => article.tArticleQuantity)
  @JoinColumn({ name: 'article_id' })
  oArticle: Article;

  @ManyToOne(() => Inventory, (inventory) => inventory.tArticleQuantity)
  @JoinColumn({ name: 'inventory_id' })
  oInventory: Inventory;

  value?: number;
}
