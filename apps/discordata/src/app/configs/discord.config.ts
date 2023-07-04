import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs(
  'discord',
  (): Record<string, any> => ({
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.DISCORD_GUILD_ID_WITH_COMMANDS,
  })
);
