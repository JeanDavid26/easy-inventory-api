import { Module } from '@nestjs/common';
import { DbManagerModule } from 'src/database/db-manager/db-manager.module';

@Module({
  imports: [DbManagerModule],
  exports: [DbManagerModule],
})
export class SharedModule {}
