import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ApplicationModule } from './common/app/index';
import { ValidationPipe } from '@nestjs/common';
import { PermissionsGuard } from './guards/permission.guard';
import * as express from 'express';
import { join } from 'path';
import { config } from '../config/index';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(express.static(join(__dirname, '../public')));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(session({
    secret: config.auth.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // TODO: when HTTPS
      // secure: true
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new PermissionsGuard(new Reflector()));

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
