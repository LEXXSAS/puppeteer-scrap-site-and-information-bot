require('dotenv').config();
const path= require('path');
const fs = require('fs');
const {Telegraf} = require('telegraf');
const Markup = require('telegraf/markup');

const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const fileUpload = require('express-fileupload');

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const currentJsonFile = path.join(__dirname, './files/');

const moveJsonFileMiddleware = async(req, res, next) => {
  if (req.files.file.name !== undefined) {
    req.files.file.mv(currentJsonFile + req.files.file.name);
    console.log(`${req.files.file.name} успешно сохранен на сервере!`)
    next()
  } else {
    console.log('Непредвиденная ошибка moveImageMiddleware')
    next()
  }
}

const botMiddleware = async(req, res, next) => {
  const automessage = 'В джире произошли изменения'
  sendAlertMessageInChat(automessage);
  next()
}

app.post('/filetwo', moveJsonFileMiddleware, botMiddleware, (req, res) => {
    res.send('Json file успешно сохранен на сервере!')
});

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));

const arraySliceNumber = 3;

const currentDirImage = path.join(__dirname, './files/');

const bot = new Telegraf(process.env.BOT_TWO_TOKEN, {});

bot.start((ctx) => {
  ctx.reply('Привет! Я ваш помощник бот. Для показа меню напишите /menu')
})

bot.help((ctx) => {
  ctx.reply('Отправьте /start для приветствия');
  ctx.reply('Отправьте /menu для показа меню');
});

const inlineKeyboard = [
  [
    {
      text: `Получить список последних ${arraySliceNumber} заявок`,
      callback_data: 'getfile'
    }
  ],
];

const replyMarkup = {
  inline_keyboard: inlineKeyboard
};

bot.command('menu', (ctx) => {
  ctx.reply(
    'Выберите действие',
    Markup.inlineKeyboard([
      [
        Markup.button.callback(`Получить список последних ${arraySliceNumber} заявок`, 'getfile'),
      ],
      [
        Markup.button.callback(`Меню`, 'startmenu'),
        Markup.button.callback(`Автоотправка`, 'autosend'),
      
      ],
      [
        Markup.button.callback(`Остановить автоотправку`, 'stopautosend'),
      ]
    ], { columns: 2 })
  );
});

const sendLocalFileWithTimeout = (ctx, time) => {

    const datanew = fs.readFileSync(`${currentDirImage}data.json`, 'utf-8');
    const jsonFromDataNew = JSON.parse(datanew);

    Object.values(jsonFromDataNew.slice(0, arraySliceNumber)).forEach((item) => {
      const markdownnew = `
      url: *${item.url}*\ndescription: _${item.description}_
      `;
      ctx.reply(markdownnew, { parse_mode: 'Markdown' });
    })

  setTimeout(() => {
    ctx.reply(
      'Выберите действие',
      Markup.inlineKeyboard([
        [
          Markup.button.callback(`Получить список последних ${arraySliceNumber} заявок`, 'getfile'),
        ],
        [
          Markup.button.callback(`Меню`, 'startmenu'),
          Markup.button.callback(`Автоотправка`, 'autosend'),
        
        ],
        [
          Markup.button.callback(`Остановить автоотправку`, 'stopautosend'),
        ]
      ], { columns: 2 })
    );
  }, time)
}

let intervalId;

bot.on('callback_query', async(ctx) => {
  if (ctx.callbackQuery.data === 'getfile') {
    try {
      sendLocalFileWithTimeout(ctx, 150);
    } catch (error) {
      console.log('Ошибка получения файла =>', error)
    }
  } else if (ctx.callbackQuery.data === 'autosend') {
    try {
      intervalId = setInterval(() => {
        sendLocalFileWithTimeout(ctx, 150);
      }, 5000);
    } catch (error) {
      console.log('Ошибка получения файла =>', error)
    }
  } else if (ctx.callbackQuery.data === 'stopautosend') {
    clearInterval(intervalId)
  } else if (ctx.callbackQuery.data === 'startmenu') {
    ctx.reply(
      'Выберите действие',
      Markup.inlineKeyboard([
        [
          Markup.button.callback(`Получить список последних ${arraySliceNumber} заявок`, 'getfile'),
        ],
        [
          Markup.button.callback(`Меню`, 'startmenu'),
          Markup.button.callback(`Автоотправка`, 'autosend'),
        
        ],
        [
          Markup.button.callback(`Остановить автоотправку`, 'stopautosend'),
        ]
      ], { columns: 2 })
    );
  }
});

bot.use((ctx, next) => {
  if (ctx.message.text === 'hello') {
    ctx.reply('Hello!')
  } else {
    next()
  }
})

async function sendAlertMessageInChat(messsage) {
  bot.telegram.sendMessage(process.env.CHAT_ID, messsage, { reply_markup: replyMarkup })
}

bot.launch();
