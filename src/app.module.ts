import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DbManagerModule } from './database/db-manager/db-manager.module';
import { BusinessModule } from './business/business.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TranslateValidatorErrorFilter } from './shared/filter/translate-validator-error/translate-validator-error.filter';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/services/auth.guard';

@Module({
  imports: [SharedModule, DbManagerModule, BusinessModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: TranslateValidatorErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
