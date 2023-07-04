import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { green, yellow } from 'cli-color';
import swaggerInit from './app/swagger';
import helmet from 'helmet';
import { useContainer } from 'class-validator';

const logger = new Logger('NestApplication', { timestamp: true });

async function bootstrap(logger: Logger) {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  // Start app
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  // Swagger
  await swaggerInit(app, configService);

  app.enableCors({
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Signature, Authorization',
    origin: true,
    credentials: true,
  });
  app.use(helmet());

  // Listener port

  await app.listen(configService.get('app.port'), () => {
    logger.log(
      `API application on port: ${yellow(configService.get('app.port'))}`
    );
    logger.log(
      `API application ${green('version:')} ${yellow(
        configService.get('app.pack.version')
      )} ${green('started!')}`
    );
    logger.log(`🚀: http://localhost:${configService.get('app.port')}/swagger`);
  });
  return app;
}

/**
 * Shutdown the application.
 */
bootstrap(logger).catch((error: unknown) => {
  logger.error(`API bootstrapping application failed! ${error}`);
});
