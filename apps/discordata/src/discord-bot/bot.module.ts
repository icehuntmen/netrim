import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { RegisterCommand } from './commands/register.command';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [RegisterCommand, BotGateway],
})
export class BotModule {}
