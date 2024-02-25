import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    TransactionModule,
    InventoryModule,
    UserModule,
  ],
})
export class BusinessModule {}
