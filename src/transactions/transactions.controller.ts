/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    console.log(id);
    console.log(typeof id)
    return this.transactionsService.findOne(id);
  }

  @Post()
  makeTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Patch(':id')
  updateTransaction(@Param('id') id: string, @Body() UpdateTaskDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, UpdateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
