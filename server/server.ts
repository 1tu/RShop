import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import { join } from 'path';

import { config } from '../config';
import { ApplicationModule } from './common/app';
import { PermissionsGuard } from './guards/permission.guard';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(express.static(join(__dirname, '../public')));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

  app.use(
    session({
      secret: config.auth.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        // TODO: when HTTPS
        // secure: true
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new PermissionsGuard(new Reflector()));
  app.useGlobalInterceptors(new ExceptionInterceptor());

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
