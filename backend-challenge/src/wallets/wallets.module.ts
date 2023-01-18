import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { ApiEthersService } from 'src/etherscan/api-ethers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { WalletsService } from './wallets.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [WalletsController],
  providers: [WalletsService, ApiEthersService],
})
export class WalletsModule {}
