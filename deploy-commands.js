require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Responde Pong!'),
  new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Repete o que você disser')
    .addStringOption(option =>
      option.setName('mensagem').setDescription('Texto para repetir').setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('gen')
    .setDescription('Gera um token baseado no tempo')
    .addStringOption(option =>
      option.setName('mensagem').setDescription('ex: 30d').setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('users')
    .setDescription('Lista todos os usuários')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔁 Registrando comandos...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao registrar comandos:', err);
  }
})();
