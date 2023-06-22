import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import configs from "./configs";
import {CommonsModule} from "../../../../libs/commons/src";



@Module({
  imports: [ConfigModule.forRoot({
    load: configs,
    isGlobal: true,
    envFilePath: '.env',
  }), CommonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
