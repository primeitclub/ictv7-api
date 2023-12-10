import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { sessionKeys } from 'src/config/env';
import * as passport from 'passport';
const PORT = env.port;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log({ PORT });
  app.enableCors({
    origin: [
      '*',
      'https://ictv7.primitclub.com',
      'http://ictv7.primitclub.com',
      'http://localhost:5173',
      'localhost:5173'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });
  //   google oauth setup
  app.use(
    session({
      secret: sessionKeys.secretKey || 'session-secret-default-key',
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.useGlobalPipes(new ValidationPipe());

  // * Swagger intialization
  const config = new DocumentBuilder()
    .setTitle('ICT Meetup v7')
    .setDescription('API for ICT Meetup v7')
    .addBearerAuth()
    .setVersion(env.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
}
bootstrap().then(() =>
  console.info(`************ STARTED on PORT: ${PORT} *************`)
);
