import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [SharedModule],
})
export class TransactionModule {}
