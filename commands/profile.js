const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'profile',
    aliases: ['p', 'profile'],
    execute(message, client, prefix) {
        const args = message.content.substring(prefix.length).split(" ")
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        const {EmbedBuilder} = require("discord.js");

         id  = message.guild.id;
         user_id = message.author.id;

        db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
            const color = row.color
            db.get('SELECT * FROM users WHERE id = ?', [user_id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            const embed = new EmbedBuilder()
                .setTitle(`Паспорт =3`)
                .setDescription(`- Имя в базе \` ${rows.user_nick} \` \n - Айди в базе \` ${rows.id} \` `)
                .setColor(color)
                .setTimestamp(Date.now())


            message.reply({embeds: [embed]});
            console.log(args)})})
    },
};