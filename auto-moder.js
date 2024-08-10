client.on('guildBanAdd', async (ban, guild) => {
    const fetchedLogs = await ban.guild.fetchAuditLogs({
        limit: 1,
        type: 22,
    });

    const banLog = fetchedLogs.entries.first();
    const { executor, target, reason } = banLog;

    const user = await client.users.fetch(executor.id);
    const serverID = ban.guild.id

    db.get('SELECT * FROM servers WHERE serverID = ?', [serverID], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        if (row.log_channel) {
            const embed = new EmbedBuilder()
                .setTitle('Журнал Аудита')
                .setDescription(`[BAN] \`${user.tag}\` забанил \`${target.tag}\`\nПричина: ${reason}`)
                .setColor('FF0000')
                .setTimestamp();

            const channel = ban.guild.channels.cache.get(row.log_channel);
            if (channel) {
                channel.send({ embeds: [embed] });
            } else {
                console.log(`Log channel not found: ${row.log_channel}`);
            }
        }
    });
});

client.on('guildBanRemove', async (unban, guild) => {

    const serverID = unban.guild.id;

    db.get('SELECT * FROM servers WHERE serverID = ?', [serverID], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        if (row && row.log_channel) {
            const embed = new EmbedBuilder()
                .setTitle('Журнал Аудита')
                .setDescription(`[UNBAN] \`${unban.user.tag}\` Разбанен `)
                .setColor('FF0000')
                .setTimestamp();

            const channel = unban.guild.channels.cache.get(row.log_channel);
            if (channel) {
                channel.send({ embeds: [embed] });
            } else {
                console.log(`Log channel not found: ${row.log_channel}`);
            }
        }
    });
});

client.on('messageDelete', async (message, guild) => {
    if(message.author.bot) return
    const logs = await message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
        limit: 1,
    });
    const firstEntry = logs.entries.first();
    const { executor, target, targetId } = firstEntry;
    // Ensure the executor is cached
    const user = await client.users.fetch(executor);
    id = message.guild.id
    db.get('SELECT * FROM servers WHERE serverID = ?', [id], (err, row) => {
        console.log(row.log_channel)
        channelid = row.log_channel
        if (row.log_channel) {
            const embed = new EmbedBuilder()
                .setTitle(`Журнал Аудита`)
                .setDescription(`[MESSAGE_REMOVE] \`${executor.tag}\` Удалил сообщение от \`${message.author.tag}\` Cообщение: ${message.content}`)
                .setColor("Red")
                .setTimestamp(Date.now())

            const channel = message.guild.channels.cache.get(channelid);
            channel.send({embeds: [embed]});
        }
    });
})
