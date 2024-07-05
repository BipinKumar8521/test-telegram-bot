const { Telegraf } = require("telegraf");

require("dotenv").config();
const token = process.env.BOT_TOKEN;

const link = "https://www.google.com/";

const bot = new Telegraf(token);
bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "Open Google", web_app: { url: link } }]],
    },
  })
);

bot.command("help", (ctx) => {
  ctx.reply("Type anything to get started");
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
      keyboard: [
        [{ text: "Open Link", web_app: { url: link, username: "game" } }],
      ],
    },
  });
}
