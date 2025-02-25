import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector} from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe, Logger, ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CORS } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: false,
    }),

  });

//if (process.env.NODE_ENV === 'development') {
  //const morgan = await import('morgan');
  //app.use(morgan('combined'));
//}
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


// Swagger only development environment 
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('AgileFlow API')
      .setDescription('The API Manage Projects: Flowing Agilely Through Tasks.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('AgileFlow/docs', app, document);
  }

   await app.listen(configService.get('PORT'), '0.0.0.0');
  console.log(`Server Application Up: ${await app.getUrl()}`);

  if(process.env.NODE_ENV === 'production') {
    console.log(`Server: ${process.env.API_NAME}`)
  }
}
bootstrap();
