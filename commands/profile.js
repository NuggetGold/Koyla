const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'profile',
    aliases: ['p', 'profile'],
    description: "ℹ️ Для настройки новых пользавателей",
    usage: "<prefix>welcome",
    cooldown: 10,
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
            let status
            if(rows.premka === 0) {
                status = 'Подписка неактивна'
            }else{
                status = 'Подписка активна'
            }
            const embed = new EmbedBuilder()
                .setTitle(`Паспорт =3`)
                .setDescription(`- <:member:1272117365852868730> \` ${rows.user_nick} \` \n - <:koyla:1272117374769954816> Подписка K+ \` ${status} \`\n__ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n - <:money:1272117382801920083> ${rows.money}`)
                .setColor(color)
                .setTimestamp(Date.now())


            message.reply({embeds: [embed]});
            console.log(args)})})
    },
};
