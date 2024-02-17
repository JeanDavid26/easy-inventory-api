import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DbManagerModule } from './database/db-manager/db-manager.module';
import { BusinessModule } from './business/business.module';
import { APP_FILTER } from '@nestjs/core';
import { TranslateValidatorErrorFilter } from './shared/filter/translate-validator-error/translate-validator-error.filter';

@Module({
  imports: [SharedModule, DbManagerModule, BusinessModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: TranslateValidatorErrorFilter,
    },
  ],
})
export class AppModule {}
