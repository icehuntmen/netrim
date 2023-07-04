import { ModalFieldsTransformPipe } from '@discord-nestjs/common';
import {
  Command,
  EventParams,
  Handler,
  IA,
  InjectDiscordClient,
  On,
} from '@discord-nestjs/core';
import type { ModalActionRowComponentBuilder } from '@discordjs/builders';
import { Logger, UseGuards } from '@nestjs/common';
import {
  ActionRowBuilder,
  Client,
  ClientEvents,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  codeBlock,
  ModalSubmitInteraction,
} from 'discord.js';

import { FormDto } from './dto/form.dto';
import { IsModalInteractionGuard } from '../guards/is-modal-interaction.guard';

@Command({
  name: 'submit-registration-request',
  description: 'Apply for registration',
})
export class RegisterCommand {
  private readonly logger = new Logger(RegisterCommand.name);
  private readonly requestParticipantModalId = 'RequestParticipant';
  private readonly usernameComponentId = 'username';
  private readonly commentComponentId = 'comment';
  private readonly textComponentId = 'text';

  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  @Handler()
  async onRegisterCommand(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setTitle('Подать заявку')
      .setCustomId(this.requestParticipantModalId);

    const userNameInputComponent = new TextInputBuilder()
      .setCustomId(this.usernameComponentId)
      .setLabel('Мой handle в игре')
      .setStyle(TextInputStyle.Short);

    const commentInputComponent = new TextInputBuilder()
      .setCustomId(this.commentComponentId)
      .setLabel('Расскажи о себе')
      .setStyle(TextInputStyle.Paragraph);

    const textInputComponent = new TextInputBuilder()
      .setCustomId(this.textComponentId)
      .setLabel('Add an explanatory comment')
      .setPlaceholder('Nothing selected')
      .setStyle(TextInputStyle.Paragraph);

    const rows = [
      userNameInputComponent,
      commentInputComponent,
      textInputComponent,
    ].map((component) =>
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        component
      )
    );

    modal.addComponents(...rows);

    await interaction.showModal(modal);
  }

  @On('interactionCreate')
  @UseGuards(IsModalInteractionGuard)
  async onModuleSubmit(
    @IA() forma: FormDto,
    @EventParams() eventArgs: ClientEvents['interactionCreate']
  ): Promise<void> {
    const [modal] = eventArgs;
    console.dir(
      {
        forma,
        eventArgs,
        modal,
        ismod: modal.isModalSubmit(),
        id: this.requestParticipantModalId,
      },
      { depth: 1 }
    );

    if (!modal.isModalSubmit()) return;

    this.logger.log(`Modal ${modal.customId} submit`);

    if (modal.customId !== this.requestParticipantModalId) return;
    //
    await modal.reply(
      `, your request has been submitted.` +
        codeBlock('markdown', forma.comment)
    );
  }
}
