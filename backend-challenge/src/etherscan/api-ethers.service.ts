import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiEthersService {
  private ETHER_API = this.configService.get<string>('ETHERSCAN');
  private API_KEY = this.configService.get<string>('APIKEY');

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getBalance(address: string): Promise<any> {
    const URL = `${this.ETHER_API}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.API_KEY}`;
    const { data } = await firstValueFrom(
      this.httpService.get<any>(URL).pipe(
        catchError((error) => {
          //Ideally we wil log the error -> this.logger.error(error.response.data);
          throw new BadRequestException(['Error comunicating with ETHER API']);
        }),
      ),
    );
    if (data.status == 0) {
      //it will be good to throw a custom exception and catch in controller
      throw new BadRequestException(['Invalid wallet address']);
    }
    return data.result;
  }

  async getTimeStampFirstTransaction(address: string): Promise<any> {
    const URL = `${this.ETHER_API}?module=account&action=txlist&address=${address}&startblock=0
        &endblock=99999999&page=1&offset=1&sort=asc&apikey=${this.API_KEY}`;
    const { data } = await firstValueFrom(
      this.httpService.get<any>(URL).pipe(
        catchError((error) => {
          //Log the error this.logger.error(error.response.data);
          throw new BadRequestException(['Error comunicating with ETHER API']);
        }),
      ),
    );

    return data.status == '1' ? data.result[0].timeStamp : 0;
  }
}
