const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'picker',
    description: "ℹ️ Игра угадай рандомное число!.",
    cooldown: 1,
    aliases: ['numb', 'цифры'],
    usage: `<prefix>picker [number] | <Не обязательный аргумент> [Обязательный аргумент]`,
    execute(message, args, prefix, client) {
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        id = message.guild.id

        db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
            const color = row.color
            let numb = row.number
            if(message.author.bot) return;
            rand = Math.floor(Math.random() * 100)

            if(numb === null) {
                const embed = new EmbedBuilder()
                    .setTitle(`Игра | Цифорки цифорки..`)
                    .setDescription(`Циферка слишком лёгкая, или не доступна, попробуйте ещё раз!`)
                    .setColor(`ff0000`)
                    .setTimestamp(Date.now())

                message.reply({embeds: [embed]});
                id_server = message.guild.id
                db.run(`UPDATE servers SET number = '${rand}' WHERE serverID = '${id_server}'`);

            }
            if (isNaN(args)) {
                const embed = new EmbedBuilder()
                    .setTitle(`❌ | Ошибка `)
                    .setDescription(`\`${args}\` - Не является числом.`)
                    .setColor('FF0000')
                    .setTimestamp(Date.now())
                return message.reply({embeds: [embed]});}

            if(args[0] === numb) {
                const embed = new EmbedBuilder()
                    .setTitle(`Игра | Цифорки цифорки..`)
                    .setDescription(`Нихуя) Угадал! ${args} \n-# Мы учтём это в боте!..`)
                    .setColor(`ff0000`)
                    .setTimestamp(Date.now())

                return message.reply({embeds: [embed]});
                id_server = message.guild.id
                db.run(`UPDATE servers SET number = '${rand}' WHERE serverID = '${id_server}'`);
                db.run(`UPDATE users SET picker = picker+1 WHERE id = '${message.author.id}'`);
            }

            if(args[0] < numb) {
                const embed = new EmbedBuilder()
                    .setTitle(`Игра | Цифорки цифорки..`)
                    .setDescription(`Не нехуя), это число больше чем ${args}`)
                    .setColor(`ff0000`)
                    .setTimestamp(Date.now())

                return message.reply({embeds: [embed]});
            }else
            if(args[0] > numb) {
                const embed = new EmbedBuilder()
                    .setTitle(`Игра | Цифорки цифорки..`)
                    .setDescription(`Не нехуя), это число меньше чем ${args}`)
                    .setColor(`ff0000`)
                    .setTimestamp(Date.now())

                return message.reply({embeds: [embed]});
            }




        })





    }}