import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [CategoryController],
  imports: [SharedModule],
})
export class CategoryModule {}
