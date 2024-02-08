import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DbManagerModule } from './database/db-manager/db-manager.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [SharedModule, DbManagerModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
