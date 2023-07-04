import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { Client, Message, TextChannel } from 'discord.js';
import { MessageFromUserGuard } from './guards/message.guard';
import { MessageToUpperInterceptor } from './interceptors/message.interceptor';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard)
  @UseInterceptors(MessageToUpperInterceptor)
  async onMessage(message: Message): Promise<void> {
    this.logger.log(`Incoming message: ${message.content}`);

    //await message.reply('Message processed successfully');
    if (message.channel instanceof TextChannel) {
      try {
        await message.channel.sendTyping();
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  }
}
