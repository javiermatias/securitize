/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ExchangeRateDocument = HydratedDocument<ExchangeRate>;

@Schema()
export class ExchangeRate {

  @Prop({ required: true, unique: true  })
  currency: string;

  @Prop({ required: true })
  rate: number;
 
  
}

export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);
