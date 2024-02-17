import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from 'src/database/entities/Transaction.entity';
import { AddTransactionDto } from './dto/add-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private _transactionService: TransactionService) {}

  @Get()
  public list(): Promise<Transaction[]> {
    return this._transactionService.listTransaction();
  }

  @Get(':id')
  public get(@Param('id') id: number): Promise<Transaction> {
    id = Number(id);
    return this._transactionService.getTransaction(id);
  }

  @Post()
  public insert(@Body() data: AddTransactionDto): Promise<Transaction> {
    return this._transactionService.addTransaction(data);
  }
}
