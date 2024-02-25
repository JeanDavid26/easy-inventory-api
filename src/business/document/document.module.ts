import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports: [SharedModule],
})
export class DocumentModule {}
