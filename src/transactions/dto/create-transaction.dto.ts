/* eslint-disable prettier/prettier */
 
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
  INVESTMENT = 'INVESTMENT',
}

export class CreateTransactionDto {
  @IsString({ message: 'A descrição tem que ser um texto' })
  @IsNotEmpty({ message: 'este campo não pode ser vazio!' })
  readonly description: string;

  @IsNotEmpty({ message: 'este campo não pode ser vazio!' })
  @IsNumber()
  readonly amount: number;

  @IsEnum(TransactionType, { message: 'O tipo deve ser INCOME, OUTCOME ou INVESTMENT' })
  readonly type: TransactionType;

  @IsString({message: 'A categoria deve ser um texto'})
  @IsNotEmpty({message: 'A categoria não pode ser vazia'})
  readonly category: string;

  @IsDateString({}, {message: 'A data deve estar no formato ISO8601'})
  readonly date: string;
}
