const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const hero = require("../../../contents/heroes.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("герои")
        .setDescription("Список всех доступных героев.")
        .setDMPermission(false),

    async execute(interaction) {

        const heroNames = Object.keys(hero).sort();

        const heros = heroNames.map((hero) => `**${hero}**`).join("\n\n")

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle("Список всех доступных героев!")
            .setDescription(heros)

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
