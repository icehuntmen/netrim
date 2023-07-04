import { version } from "../../../../package.json";
import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HelperService} from "../../../../libs/commons/src/lib/helper.service";
export default async function swaggerInit(app: INestApplication, config: ConfigService) {
  const fileDocumentSecondary = HelperService.readDocsFile('description.md');
  const description = [fileDocumentSecondary].filter((el) => el).join('\n\n');
  const documentBuild = new DocumentBuilder()
    .setTitle('Discord Documentation')
    .setDescription(description)
    .setVersion(`v${version}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
    extraModels: [],
  });

  SwaggerModule.setup('swagger', app, document, {
    explorer: true,
    customSiteTitle: 'SSSS',
  });
}
