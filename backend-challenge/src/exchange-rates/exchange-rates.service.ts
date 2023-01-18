import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRate, ExchangeRateDocument } from './schemas/rate.schema';
import { ExchangeRate as Exchange } from './entities/exchange-rate.entity';

@Injectable()
export class ExchangeRatesService {
  constructor(
    @InjectModel(ExchangeRate.name)
    private exchangeModel: Model<ExchangeRateDocument>,
  ) {}

  async create(
    createExchangeRateDto: CreateExchangeRateDto,
  ): Promise<ExchangeRate> {
    const createdExchangeRate = new this.exchangeModel(createExchangeRateDto);
    return await createdExchangeRate.save();
  }

  async findAll(): Promise<Exchange[]> {
    const listExchange = await (
      await this.exchangeModel.find().exec()
    ).map((doc) => new Exchange(doc.currency, doc.rate));

    return listExchange;
  }

  async findOne(currency: string): Promise<Exchange> {
    const _exchange = await this.exchangeModel.findOne({ currency });
    return new Exchange(_exchange.currency, _exchange.rate);
  }

  async update(currency: string, updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.exchangeModel.updateOne(
      { currency },
      { $set: { ...updateExchangeRateDto } },
    );
  }
}
