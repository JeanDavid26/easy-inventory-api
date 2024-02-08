import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionManagerService } from 'src/database/db-manager/transaction-manager/transaction-manager.service';
import { Transaction } from 'src/database/entities/Transaction.entity';
import { AddTransactionDto } from './dto/add-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private _transactionService: TransactionService,
    private _transactionManagerService: TransactionManagerService,
  ) {}

  @Get()
  public lister(): Promise<Transaction[]> {
    return this._transactionManagerService.list();
  }

  @Get(':id')
  public recuperer(@Param('id') id: number): Promise<Transaction> {
    return this._transactionManagerService.get(id);
  }

  @Post()
  public ajouter(@Body() data: AddTransactionDto): Promise<Transaction> {
    return this._transactionService.addTransaction(data);
  }
}
