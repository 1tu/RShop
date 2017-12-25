import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as bodyParser from 'body-parser';
import { ApplicationModule } from './common/app/index';
import { config } from './config/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  // TODO: swagger implementation
  // const options = new DocumentBuilder()
  //   .setTitle('RShop')
  //   .setDescription('RShop API description')
  //   .setVersion('0.1')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/api', app, document);

  await app.listen(config.server.port);
}
bootstrap();
