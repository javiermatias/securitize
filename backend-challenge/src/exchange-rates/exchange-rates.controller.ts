/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExchangeRate } from './entities/exchange-rate.entity';

@ApiTags('Exchange Rates')
@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) { }

  @Post()
  create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return this.exchangeRatesService.create(createExchangeRateDto);


  }

  @Get()
  findAll(): Promise<ExchangeRate[]> {
    return this.exchangeRatesService.findAll();
  }

  @Get(':currency')
  findOne(@Param('currency') currency: string): Promise<ExchangeRate> {
    return this.exchangeRatesService.findOne(currency.toUpperCase());
  }

  @Patch(':currency')
  update(@Param('currency') currency: string, @Body() updateExchangeRateDto: UpdateExchangeRateDto) {
    //return currency;
    return this.exchangeRatesService.update(currency, updateExchangeRateDto);
    //return this.exchangeRatesService.update(currency, updateExchangeRateDto );
  }


}
