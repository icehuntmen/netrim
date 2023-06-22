import { Module } from '@nestjs/common';
import {HelperService} from "./helper.service";

@Module({
  controllers: [],
  providers: [HelperService],
  exports: [],
})
export class CommonsModule {}
