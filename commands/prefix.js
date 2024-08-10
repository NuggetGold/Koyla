const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'prefix',
    description: 'See all the commands!',
    aliases: ['префикс', 'команда'],
    execute(message, client, prefix) {
        const args = message.content.substring(prefix.length).split(" ")
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        const {EmbedBuilder} = require("discord.js");
        db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            const embed = new EmbedBuilder()
                .setTitle(`Нови Префикса =3`)
                .setDescription(`Успешно! Ваш новый префикс ${args[1]}`)
                .setColor(row.color)
                .setTimestamp(Date.now())

            id = message.guild.id;
            message.reply({embeds: [embed]});
            db.run(`UPDATE servers SET prefix = '${args[1]}' WHERE serverID = '${id}'`);
            console.log(args)})
    },
};