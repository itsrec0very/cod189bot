const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const artifacts = require("../../../contents/artifacts.json");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("артефакт")
    .setDescription("Получить информацию об артефакте")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("название")
        .setDescription("Название артефакта")
        .setRequired(true)
        .setAutocomplete(true),
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();
    const choices = Object.keys(artifacts);
    const filtered = choices
      .filter((choice) => choice.toLowerCase().startsWith(focusedValue))
      .slice(0, 25);
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },

  async execute(interaction) {
    const userSelection = interaction.options.getString("название");

    const selectedArtifact = artifacts[userSelection];

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setTitle(userSelection)
      .setFields(
        { name: "Редкость:", value: selectedArtifact.rarity, inline: false },
        {
          name: "Предназначение:",
          value: selectedArtifact.role,
          inline: false,
        },
        { name: "Баф:", value: selectedArtifact.buffs, inline: false },
        {
          name: "Роль:",
          value: selectedArtifact.units,
          inline: false,
        },
        { name: "Уровень:", value: selectedArtifact.tier, inline: false },
      );

    if (selectedArtifact.image !== "") {
      const attachment = new AttachmentBuilder()
        .setFile(`./assets/artifact/${selectedArtifact.image}`)
        .setName(`image.png`);

      const embed2 = new EmbedBuilder()
        .setColor("#f59e0b")
        .setTitle(`${userSelection}`)
        .setImage("attachment://image.png");

      await interaction.reply({ files: [attachment], embeds: [embed2, embed] });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  },
};
