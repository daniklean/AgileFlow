import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.setGlobalPrefix('api/v1');
  await app.listen(configService.get('PORT'));
  console.log(`Server Application Up: ${await app.getUrl()}`);
}
bootstrap();
