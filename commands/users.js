const { EmbedBuilder } = require('discord.js');

async function users(interaction) {
  const res = await fetch(`http://localhost:8080/v1/users`);
  const response = await res.json();
  
  if (!response.success || !Array.isArray(response.data) || response.data.length === 0) {
    return interaction.reply('❌ Nenhum usuário encontrado.');
  }
  
  const data = response.data;  

  const pageSize = 5;
  let page = 0;

  // Função que monta o embed da página atual
  const generateEmbed = (page) => {
    const start = page * pageSize;
    const end = start + pageSize;
    const pageData = data.slice(start, end);

    return new EmbedBuilder()
      .setTitle('👥 Lista de Usuários')
      .setDescription(
        pageData
          .map((user, i) => {
            const expiresAt = new Date(user.key.expires);
            const now = new Date();
            const diffMs = expiresAt - now;
            const diffMin = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMin / 60);
            const diffDays = Math.floor(diffHours / 24);
      
            const timeLeft = diffMs <= 0
              ? '❌ Expirado'
              : `⏳ ${diffDays}d ${diffHours % 24}h ${diffMin % 60}m`;
      
            return `**${start + i + 1}.** ${user.username || 'Sem nome'} - ${user.email || 'Sem email'} - ${timeLeft}`;
          })
          .join('\n')
      )      
      .setFooter({ text: `Página ${page + 1} de ${Math.ceil(data.length / pageSize)}` })
      .setColor('Blue');
  };

  const message = await interaction.reply({ embeds: [generateEmbed(page)], fetchReply: true });

  if (data.length <= pageSize) return;

  await message.react('⬅️');
  await message.react('➡️');

  const collector = message.createReactionCollector({
    filter: (reaction, user) =>
      ['⬅️', '➡️'].includes(reaction.emoji.name) &&
      user.id === interaction.user.id,
    time: 60000,
  });

  collector.on('collect', (reaction) => {
    reaction.users.remove(interaction.user); // remove reação do usuário
    if (reaction.emoji.name === '⬅️' && page > 0) {
      page--;
    } else if (reaction.emoji.name === '➡️' && (page + 1) * pageSize < data.length) {
      page++;
    }

    message.edit({ embeds: [generateEmbed(page)] });
  });

  collector.on('end', () => {
    message.reactions.removeAll().catch(() => {});
  });
}

module.exports = { users };
