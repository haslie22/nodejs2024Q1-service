import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import PrismaExceptionFilter from './filter/prismaException.filter';
import { CustomExceptionFilter } from './filter/customException.filter';
import { CustomLoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 4000;

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const loggingService = new CustomLoggerService(configService);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    // new CustomExceptionFilter(loggingService),
  );

  process.on('uncaughtException', (err, origin) => {
    loggingService.error(`Uncaught Exception: ${err.message}`, origin);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.warn(`Unhandled Rejection: ${reason}`);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('3.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(APP_PORT);
}

bootstrap();
