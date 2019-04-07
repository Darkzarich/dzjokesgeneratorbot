const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Устанавливаем токен, который выдавал нам бот.
const token = process.env.API_KEY;
// Включить опрос сервера
const bot = new TelegramBot(token, {polling: true});

	const options = {
		reply_markup: JSON.stringify({
		    keyboard: [
		      [{ text: 'Oh, God, I wish I knew more jokes 🙏'}],
		    ]
		})
	};

bot.on('callback_query', function (msg) {
	switch (msg.data) {
		case 'Oh, God, I wish I got knew jokes 🙏': 
			sendJoke(msg.from.id); break;
	}
});

bot.onText(/\/start/, async function (msg, match) {
	bot.sendMessage(msg.from.id, "Hello! 😁 I'm here to throw some jokes at you! 😤 Now, shall we begin? 😜 /n Feeling ready, aren't ya? Smash the button right below to start 👇👇👇", options);
});

bot.onText(/\/joke/, async function (msg, match) {
	sendJoke(msg.from.id);
});

async function sendJoke (fromId) {
	const {data} = await getJoke();	
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