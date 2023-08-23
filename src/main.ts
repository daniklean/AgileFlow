import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CORS } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);

  app.enableCors(CORS);

  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('AgileFlow API')
    .setDescription('The API Manage Projects: Flowing Agilely Through Tasks.')
    .setVersion('1.0')
    // .addTag('Tasks, Projects, Kanban')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('AgileFlow/docs', app, document);

   await app.listen(configService.get('PORT'));
  console.log(`Server Application Up: ${await app.getUrl()}`);
}
bootstrap();
