import {INestApplication, Logger} from '@nestjs/common';

import bootstrap from "./app/bootstrap";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//   const port = process.env.PORT || 3333;
//   await app.listen(port);
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//   );
// }
//
// bootstrap();


let app: INestApplication;
const logger = new Logger('NestApplication', { timestamp: true });

/**
 * Shutdown the application.
 */
bootstrap(app, logger).catch((error: unknown) => {
  logger.error(`API bootstrapping application failed! ${error}`);
});
