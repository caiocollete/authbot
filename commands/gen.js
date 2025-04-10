const { EmbedBuilder } = require('discord.js');

async function gen(mensagem, interaction) {
  const res = await fetch(`http://localhost:8080/v1/gen?time=${encodeURIComponent(mensagem)}`, {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.APIKEY
    }
  });

  const response = await res.json();

  if (!response.success) {
    const embed = new EmbedBuilder()
    .setTitle(`❌ Erro ao gerar token`)
    .setDescription(`${response.mensagem}`)
    .setColor('Red')
    .setFooter({ text: 'AuthBot • API Key Generator' })
    .setTimestamp();
    await interaction.reply({embeds:[embed]});
    return;
  }

  // Verifica se a resposta contém o token
  if (typeof response.data === 'string') {
    const embed = new EmbedBuilder()
    .setTitle(`❌ Erro ao gerar token`)
    .setDescription(`${response.mensagem}`)
    .setColor('Red')
    .setFooter({ text: 'AuthBot • API Key Generator' })
    .setTimestamp();
    await interaction.reply({embeds:[embed]});
  } 
  else {
    const expiresAt = new Date(response.data.expires);
    const now = new Date();
    const diffMs = expiresAt - now;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    const timeLeft = diffMs <= 0
      ? '❌ Expirado'
      : `⏳ ${diffDays}d ${diffHours % 24}h ${diffMin % 60}m`;

    const embed = new EmbedBuilder()
      .setTitle('🔑 Key Gerada com Sucesso')
      .setDescription('Use esta key para ser cadastrar autenticar.')
      .addFields(
        { name: 'Key', value: `||${response.data.id}||`, inline: false },
        { name: 'Expira em', value: timeLeft || 'Desconhecido', inline: false }
      )
      .setColor('Green')
      .setFooter({ text: 'AuthBot • API Key Generator' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}

module.exports = { gen };
