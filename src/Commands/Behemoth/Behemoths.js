const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const behemoth = require("../../../contents/behemoths.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("исполины")
        .setDescription("Список всех доступных исполин.")
        .setDMPermission(false),

    async execute(interaction) {

        const behemothNames = Object.keys(behemoth).sort();

        const behemoths = behemothNames.map((behemoth) => `**${behemoth}**`).join("\n\n")

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle("Список всех доступных исполин!")
            .setDescription(behemoths)

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
