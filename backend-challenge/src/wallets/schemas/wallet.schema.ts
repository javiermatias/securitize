import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  balance: string;

  @Prop({ required: true })
  favorite: boolean;

  @Prop({ required: true })
  firstTransaction: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
