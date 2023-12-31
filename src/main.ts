import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = env.port;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log({ PORT });
  app.enableCors({
    origin: '*'
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
