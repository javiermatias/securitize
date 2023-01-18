/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { ExchangeRatesController } from './exchange-rates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRate, ExchangeRateSchema } from './schemas/rate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExchangeRate.name, schema: ExchangeRateSchema }])],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService], 
})
export class ExchangeRatesModule {

}


