/* eslint-disable complexity */
const { Attachment, Client } = require('discord.js');
const client = new Client();
const botToken = require('./secrets');
const ytdl = require('ytdl-core-discord');

client.on('ready', () => {
  console.log('I am ready!');
});

async function play(connection, url) {
  let resolve = await connection;
  resolve.playOpusStream(await ytdl(url));
}

client.on('message', message => {
  if (message.content.startsWith('ping')) {
    message.channel.send('pong!');
  }
  if (message.content === 'shrug') {
    message.channel.send(`¯\\_( ツ )_/¯`);
  }
  if (message.content === 'flip') {
    message.channel.send('(╯°□°）╯︵ ┻━┻');
  }
  if (message.content === 'unflip') {
    message.channel.send('┬─┬ノ( ◕◡◕ ノ)');
  }
  if (message.content === 'rip') {
    const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
    message.channel.send(attachment);
  }
  if (message.content === 'coin flip') {
    Math.floor(Math.random() * 2) == 0
      ? message.channel.send('Heads!')
      : message.channel.send('Tails!');
  }
  if (message.content.startsWith('avatar')) {
    message.reply(message.author.avatarURL);
  }
  if (message.content.startsWith('!play')) {
    if (message.guild.voiceConnection) {
      message.channel.send(`I'm in another channel!`);
    } else {
      const channel = message.member.voiceChannel;
      let url = message.content.slice(6);
      if (channel) {
        let connection = channel.join();
        play(connection, url);
      } else {
        message.channel.send('You have to be in a channel fool!!!');
      }
    }
  }

  if (message.content === '!leave') {
    // const channel = message.member.voiceChannel;
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.disconnect();
    } else {
      message.channel.send('Not in a channel fool!!!');
    }
  }
});

client.login(botToken);
