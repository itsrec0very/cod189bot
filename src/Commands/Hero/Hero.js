const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const heros = require("../../../contents/heroes.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("герой")
        .setDescription("Получить информацию о герое.")
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName("название")
                .setDescription("Название героя")
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const choices = Object.keys(heros);
        const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue)).slice(0, 25);
        await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    },

    async execute(interaction) {
        const userSelection = interaction.options.getString("name");

        const selectedHero = heros[userSelection];

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle(userSelection)
            .setFields(
                { name: "Редкость:", value: selectedHero.rarity, inline: false },
                { name: "Роль:", value: selectedHero.role, inline: false },
                { name: "Бафы:", value: selectedHero.buffs, inline: false },
                { name: "Предназначение:", value: selectedHero.units, inline: false },
                { name: "Уровень:", value: selectedHero.tier, inline: false },
                { name: "Лучшая связка:", value: selectedHero.pairings, inline: false },
                { name: "Гайд:", value: selectedHero.talent, inline: false }
            );

        if (selectedHero.image !== "") {

            const attachment = new AttachmentBuilder()
                .setFile(`./assets/hero/${selectedHero.image}`)
                .setName(`image.png`)

            const embed2 = new EmbedBuilder()
                .setColor("#f59e0b")
                .setTitle(`${userSelection}`)
                .setImage("attachment://image.png")

            await interaction.reply({ files: [attachment], embeds: [embed2, embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }

    },
};
