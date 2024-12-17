const { Telegraf } = require("telegraf");
const express = require("express");

require("dotenv").config();
const token = process.env.BOT_TOKEN;

const link = "https://www.google.com/";

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply("Welcome to the bot!"));

bot.command("help", (ctx) => {
	ctx.reply("Type anything to get started");
});

bot.command("google", (ctx) => {
	generateLink(link, ctx);
});

bot.command("gmail", (ctx) => {
	generateLink("https://mail.google.com/mail/u/0/#inbox", ctx);
});

//get the user input
bot.on("text", (ctx) => {
	const userInput = ctx.message.text;
	if (userInput.startsWith("https://")) {
		generateLink(userInput, ctx);
	} else {
		ctx.reply("Please send a link to open");
	}
});

bot.launch();

console.log("Bot is running");

function generateLink(link, ctx) {
	ctx.reply("Open the link with button below", {
		reply_markup: {
			keyboard: [[{ text: "Open Link", web_app: { url: link } }]],
		},
	});
}

const app = express();
app.use(bot.webhookCallback("/secret-path"));

app.get("/", (req, res) => {
	bot.launch();
	res.send("Bot is running");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
