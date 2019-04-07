var TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Устанавливаем токен, который выдавал нам бот.
var token = process.env.API_KEY;
// Включить опрос сервера
const bot = new TelegramBot(token, {polling: true});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

// // Простая команда без параметров.
// bot.on('message', function (msg) {
//     var chatId = msg.chat.id;
//     // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
//     var photo = 'cats.png';
//     bot.sendPhoto(chatId, photo, {caption: 'Милые котята'});
// });

bot.onText(/\/joke (.+)/, async function (msg, match) {
	var fromId = msg.from.id;
	let config = {
	  headers: {
	    header1: 'Accept: application/json',
	  }
	}

	let {data} = await axios.get("https://icanhazdadjoke.com/slack", config);	
	bot.sendMessage(fromId, data.attachments[0].text);
});