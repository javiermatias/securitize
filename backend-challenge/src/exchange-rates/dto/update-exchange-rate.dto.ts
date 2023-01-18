import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeRateDto } from './create-exchange-rate.dto';

export class UpdateExchangeRateDto extends PartialType(CreateExchangeRateDto) {


    
}
