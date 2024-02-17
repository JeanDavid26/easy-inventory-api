import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ArticleController],
  imports: [SharedModule],
})
export class ArticleModule {}
