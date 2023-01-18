import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { WalletsModule } from './wallets/wallets.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Swagger Api documentation
  const config = new DocumentBuilder()
    .setTitle('Digital Wallet API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [WalletsModule, ExchangeRatesModule],
  });
  
  SwaggerModule.setup('doc', app, document);
  //Catch some MongoDB errors
  app.useGlobalFilters(new MongoExceptionFilter());
  app.enableCors();
 
  await app.listen(3001);
}
bootstrap();
