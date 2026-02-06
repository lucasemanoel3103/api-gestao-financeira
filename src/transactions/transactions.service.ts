/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  private transactions: Transaction[] = [
    {
      id: '1',
      description: 'Salário',
      amount: 3000,
      type: 'INCOME',
      category: 'Trabalho',
      date: new Date('2026-01-05'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const allTransactions = await this.prisma.transaction.findMany();
    return allTransactions;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (!transaction?.description) {
      throw new HttpException(
        'Tarefa não foi encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return transaction;
  }

  async create(CreateTransacitonDto: CreateTransactionDto) {
    const newTransaction = await this.prisma.transaction.create({
      data: {
        description: CreateTransacitonDto.description,
        amount: CreateTransacitonDto.amount,
        category: CreateTransacitonDto.category,
        type: CreateTransacitonDto.type,
        date: CreateTransacitonDto.date ? new Date(CreateTransacitonDto.date) : new Date(),
      },
    });

    return newTransaction;
  }

  async update(id: string, UpdateTransactionDto: UpdateTransactionDto) {
    const findTransaction = await this.prisma.transaction.findFirst({
      where: {
        id: id
      }
    })

    if(!findTransaction){
      throw new HttpException('Essa transação não existe!', HttpStatus.NOT_FOUND)
    }

    const transaction = await this.prisma.transaction.update({
      where: {
        id: findTransaction.id
      },
      data: UpdateTransactionDto
    })

    return transaction;
  }

  async delete(id: string) {
    const findTransaction = await this.prisma.transaction.findFirst({
      where: {
        id: id
      }
    })

    if(!findTransaction){
      throw new HttpException('Essa transação não existe!', HttpStatus.NOT_FOUND)
    }

    await this.prisma.transaction.delete({
      where: {
        id: findTransaction.id
      }
    })

    return{
      message: 'Transação deletada com sucesso!'
    }
  }
}
