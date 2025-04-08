require('dotenv').config();
const { gen } = require('./commands/gen');
const { users } = require('./commands/users');
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }

  if (commandName === 'echo') {
    const mensagem = interaction.options.getString('mensagem');
    await interaction.reply(`📢 ${mensagem}`);
  }

  if (commandName === 'gen') {
    const mensagem = interaction.options.getString('mensagem');
    const resposta = await gen(mensagem);
    await interaction.reply(`🔑 Token gerado com sucesso! ||${resposta.id}||`);
  }

  if(commandName === 'users'){
    const resposta = await users(interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);