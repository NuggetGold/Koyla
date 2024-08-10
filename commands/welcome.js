

module.exports = {
    name: 'welcome',
    execute(message, args, prefix, client) {
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        const {IntentsBitField} = require("discord.js");
        const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,  Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');



        client.on('interactionCreate', async (interaction) => {

            if (interaction.isButton()) {
                if (interaction.customId === 'welcome-button') {
                    id = interaction.guild.id;
                    db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
                        const text = row.newbie_text
                    const modal = new ModalBuilder()
                        .setCustomId('welcome')
                        .setTitle('Настройка приветствий')

                    const input1 = new TextInputBuilder()
                        .setCustomId('welcome-channel')
                        .setLabel('Айди канала ')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(8)
                        .setMaxLength(16)
                        .setPlaceholder('123456789')
                        .setRequired(true)


                        const input2 = new TextInputBuilder()
                            .setCustomId('welcome-text')
                            .setLabel('Текст ')
                            .setStyle(TextInputStyle.Paragraph)
                            .setMinLength(1)
                            .setMaxLength(500)
                            .setValue(text)
                            .setPlaceholder('На сервер вошел {user}! {new} Создал аккаунт в {data}')
                            .setRequired(true)
                        const a = new ActionRowBuilder().addComponents(input1);
                        const b = new ActionRowBuilder().addComponents(input2);


                    modal.addComponents(a, b);


                     interaction.showModal(modal);
                    })
                }
            }
        })

            client.on(Events.InteractionCreate, interaction => {
                if (!interaction.isModalSubmit()) return;

                // Get the data entered by the user
                const newbie_channel = interaction.fields.getTextInputValue('welcome-channel');
                const newbie_text = interaction.fields.getTextInputValue('welcome-text');
                id = interaction.guild.id;
                db.run(`UPDATE servers SET newbie_channel = '${newbie_channel}' WHERE serverID = '${id}'`);
                db.run(`UPDATE servers SET newbie_text = '${newbie_text}' WHERE serverID = '${id}'`);

                interaction.reply({ content: 'Успешно!' });
            });

            const cancel = new ButtonBuilder()
                .setCustomId('welcome-button')
                .setLabel('Начать настройку')
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder()
                .addComponents(cancel);

            message.reply({
                content: `Нажмите кнопку чтобы настроить отправку сообщений о новичках! \n\n **PlaceHolders** \n {user} - Ник того кто зашел \n {data} - Дата создание аккаунта \n {join} - Дата присоединения на сервер`,
                components: [row]
            })




    },
};