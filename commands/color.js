const {EmbedBuilder} = require("discord.js");
const {hex} = require("chalk");
const err = require("mineflayer-chat/src/helpers/ParseMessage");

module.exports = {
    name: 'color',
    // any other details you might like, such as:
    description: 'See all the commands!',
    aliases: ['c', 'цвет'],
    execute(message, client, prefix) {
        const args = message.content.substring(prefix.length).split(" ")
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        const {EmbedBuilder} = require("discord.js");
        db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
        isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))
        console.log(isHexColor(`${args[1]}`))

        if (isHexColor(`${args[1]}`) === false) {
            const embed = new EmbedBuilder()
                .setTitle(`❌ | Ошибка `)
                .setDescription(`\`${args[1]}\` - Не является цветом.`)
                .setColor('FF0000')
                .setTimestamp(Date.now())
            message.reply({embeds: [embed]});
        }else {


            const embed = new EmbedBuilder()
                .setTitle(`Нови Цветаааа =3`)
                .setDescription(`Успешно! Ваш новый цвет! ${args[1]}`)
                .setColor(row.color)
                .setTimestamp(Date.now())

            id = message.guild.id;
            message.reply({embeds: [embed]});
            db.run(`UPDATE servers SET color = '${args[1]}' WHERE serverID = '${id}'`);
            console.log(args)}})
    },
};