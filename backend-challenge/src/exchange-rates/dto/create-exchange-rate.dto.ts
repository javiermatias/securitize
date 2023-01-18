import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}
