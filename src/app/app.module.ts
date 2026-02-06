import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // ConfigModule.forRoot({ isGlobal: true } Carrega o arquivo .env e
  // disponibiliza as variáveis (como DATABASE_URL) para todo o projeto.
  imports: [ConfigModule.forRoot({ isGlobal: true }), TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
