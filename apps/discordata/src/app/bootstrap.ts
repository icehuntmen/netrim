import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import swaggerInit from './swagger';
import { green, yellow } from 'cli-color';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

export default async function (app: INestApplication, logger: Logger) {
  app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  // Start app
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  //useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  // Swagger
  // await swaggerInit(app, configService);

  // app.enableCors({
  //   allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Signature, Authorization',
  //   origin: true,
  //   credentials: true,
  // });
  // app.use(helmet());

  // Listener port

  await app.listen(configService.get('port'), () => {
    logger.log(
      `API application on port: ${yellow(configService.get('app.port'))}`
    );
    logger.log(
      `API application ${green('version:')} ${yellow(
        configService.get('releaseVersion')
      )} ${green('started!')}`
    );
    logger.log(
      `🚀 Application is running on: http://localhost:${configService.get(
        'app.port'
      )}/${globalPrefix}`
    );
  });
  return app;
}
