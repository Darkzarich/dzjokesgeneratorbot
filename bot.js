const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Устанавливаем токен, который выдавал нам бот.
const token = process.env.API_KEY;
// Включить опрос сервера
const bot = new TelegramBot(token, {polling: true});

bot.on('callback_query', function (msg) {
	switch (msg.data) {
		case 'more_jokes': 
			sendJoke(msg.from.id);
	}
});

bot.onText(/\/joke/, async function (msg, match) {
	sendJoke(msg.from.id);
});

async function sendJoke (fromId) {
	const {data} = await getJoke();	
	const options = {
		reply_markup: JSON.stringify({
		    reply_keyboard_markup: [
		      [{ text: 'I want more jokes!', callback_data: 'more_jokes' }],
		    ]
		})
	};

	bot.sendMessage(fromId, data.attachments[0].text, options);
}

async function getJoke () {
	const config = {
	  headers: {
	    header1: 'Accept: application/json',
	  }
	}
	return await axios.get("https://icanhazdadjoke.com/slack", config)
}