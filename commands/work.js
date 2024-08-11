const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'work',
    aliases: ['w', 'rabota', 'Работа', 'воркать'],
    cooldown: 30,
    description: "ℹ️ Эко-команда, для пополнение вашего баланса, играя в чёрные игры... как я! неет.. я не чёрный.",
    usage: "<prefix>work",
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
                if(Math.floor(Math.random() * 2) === 0) {
                const embed = new EmbedBuilder()
                    .setTitle(`Воркаем по тёмному >:3`)
                    .setDescription(`Во время так называемой \`работой\` вас заметили \`cотрудники полиции\`! \n пришлось \`отдать 30% \`от заработка! \n __ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n <:money:1272117382801920083>\`${rows.money}\` => Вместо \`(${rows.lvl*1250})\` вы получите \`${1250*rows.lvl-1250*0.30}\` | Теперь ваш баланс: <:money:1272117382801920083>\`${rows.money+1250*rows.lvl-1250*0.30}\``)
                    .setColor(color)
                    .setTimestamp(Date.now())


                message.reply({embeds: [embed]});
                    db.run(`UPDATE users SET money = money+'${1250*rows.lvl-1250*0.30}' WHERE id = '${user_id}'`);
                console.log(args)}
                else if(Math.floor(Math.random() * 2) === 1) {
                    const embed = new EmbedBuilder()
                        .setTitle(`Воркаем по тёмному >:3`)
                        .setDescription(`Во время так называемой \`работой\` вы \`потеряли содержимое\`! \n пришлось \`отдать зарплату \` \n __ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n <:money:1272117382801920083>\`${rows.money} => -${rows.lvl*1250}\` | Теперь ваш баланс: <:money:1272117382801920083>\`${rows.money-rows.lvl*1250}\``)
                        .setColor(color)
                        .setTimestamp(Date.now())


                    message.reply({embeds: [embed]});
                    db.run(`UPDATE users SET money = money-'${1250*rows.lvl}' WHERE id = '${user_id}'`);
                    console.log(args)}


                else {
                    db.run(`UPDATE users SET money = money+'${1250*rows.lvl}' WHERE id = '${user_id}'`);
                    const embed = new EmbedBuilder()
                        .setTitle(`Воркаем по тёмному >:3`)
                        .setDescription(`Вы \`отлично и без припятсвий\` поворкали на этот день \n __ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n Ваш баланс был <:money:1272117382801920083> \`${rows.money} => ${1250*rows.lvl} \` | Теперь ваш баланс: <:money:1272117382801920083>\`${rows.money+rows.lvl*1250}\``)
                        .setColor(color)
                        .setTimestamp(Date.now())


                    message.reply({embeds: [embed]});
                    console.log(args)}





                })

            })



    },
};