import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseTable } from './BaseTable';
import { Category } from './Category.entity';
import { ArticleQuantity } from './ArticleQuantity.entity';

@Entity({ schema: 'easyinventory', name: 'article' })
export class Article extends BaseTable {
  @Column()
  label: string;

  @Column({ name: 'reference_code' })
  referenceCode: string;

  @Column({ name: 'bar_code', nullable: true })
  barCode: string;

  @Column({ name: 'unit_price', type: 'double precision' })
  unitPrice: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  oCategory: Category;

  @OneToMany(
    () => ArticleQuantity,
    (articleQuantity) => articleQuantity.articleId,
  )
  tArticleQuantity: ArticleQuantity[];
}
