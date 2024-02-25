import { Module } from '@nestjs/common';
import { DbManagerModule } from 'src/database/db-manager/db-manager.module';
import { FileService } from './services/file/file.service';

@Module({
  imports: [DbManagerModule],
  exports: [DbManagerModule],
  providers: [FileService],
})
export class SharedModule {}
