const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'profile',
    aliases: ['p', 'profile'],
    description: "ℹ️ Для просмотра профиля",
    usage: "<prefix>profile <@user> | <Не обязательный аргумент> [Обязательный аргумент]",
    cooldown: 10,
    execute(message, client, prefix) {
        const args = message.content.substring(prefix.length).split(" ")
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('koyla.db');
        const {EmbedBuilder} = require("discord.js");

         id  = message.guild.id;
         let user_id
        if (message.mentions.users.first()) {
            user = message.mentions.users.first()
            user_id = user.id
        } else{
            user_id = message.author.id
            user = message.author
        }

        db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
            const color = row.color
            db.get('SELECT * FROM users WHERE id = ?', [user_id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            let status
            if(rows.premka === '0') {
                status = '<:net:1272129800596881462> \`Подписка неактивна\`'
            }else{
                status = '<:da:1272129817369907303>\`Подписка активна\`'
            }
                function formatNumber(number) {
                    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            const embed = new EmbedBuilder()
                .setTitle(`Паспорт =3`)
                .setDescription(`- <:member1:1272130105313067069> \` ${rows.user_nick} \` \n- <:koyla:1272117374769954816> Подписка K+ ${status}\n- <:rank:1272260287768039555> Уровень и опыт \`${rows.lvl} (${rows.xp}/${rows.lvl*50}) \`\n__ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n- <:money:1272117382801920083> \`${formatNumber(rows.money)}\` \n- <:bank:1272131957559398511> \`Банковский счёт недоступен! \`(<:net:1272129800596881462>) \n- <:7373redgift:1272131936239878164> \`Подарки недоступны!\` (<:net:1272129800596881462>) \n__ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n- Игра в циферки: \`${rows.picker}\` \n__ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ__ \n- <:dev:1272130117438672958> \`${rows.id}\` \n- <:mod:1272130004498518150> \`Нарушений незамечено!\``)
                .setColor(color)
                .setTimestamp(Date.now())
                .setThumbnail(user.displayAvatarURL())


            message.reply({embeds: [embed]});
            console.log(args)})})
    },
};
