import { Module } from '@nestjs/common';
import { CategoryManagerService } from './category-manager/category-manager.service';
import { ArticleManagerService } from './article-manager/article-manager.service';
import { InventoryManagerService } from './inventory-manager/inventory-manager.service';
import { TransactionManagerService } from './transaction-manager/transaction-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource from 'ormconfig';
import { Article } from '../entities/Article.entity';
import { Category } from '../entities/Category.entity';
import { Inventory } from '../entities/Inventory.entity';
import { Transaction } from '../entities/Transaction.entity';
import { ArticleQuantity } from '../entities/ArticleQuantity.entity';
import { ArticleQuantityManagerService } from './article-quantity-manager/article-quantity-manager.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await datasource.initialize();
        return datasource.options; // Here we return the DataSourceOptions
      },
    }),
    TypeOrmModule.forFeature([
      Article,
      Category,
      Inventory,
      Transaction,
      ArticleQuantity,
    ]),
  ],
  providers: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    TransactionManagerService,
    ArticleQuantityManagerService,
  ],
  exports: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    TransactionManagerService,
    ArticleQuantityManagerService,
  ],
})
export class DbManagerModule {}
