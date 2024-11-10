const puppeteer = require('puppeteer');
const path= require('path');
const fs = require('fs');
const { sendJsonFileOnServer } = require('./client.js');

const currentDirToJsonFile = path.join(__dirname, './files/');

module.exports = {
  async run() {

    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: false,
      defaultViewport: null,
      args: [
        '--window-size=1920,1080',
      ],
    });
  
    const page  = await browser.newPage()

    try {
      await page.goto("https://jira.budu.ru", {
        waitUntil: "domcontentloaded",
        timeout: 60000
      })
    } catch (error) {
      console.error('Navigation Timeout Error:', error.message);
    }

    const writeToFile = (arrone) => {

      fs.readFile(currentDirToJsonFile + 'data.json', 'utf8', (error, fileContent) => {
        if (error) {
          console.error('Ошибка чтения файла =>', error);
        } else {
          try {
            let oldData = JSON.parse(fileContent);
            if (JSON.stringify(oldData) === JSON.stringify(arrone)) {
              console.log('Новых данных нет');
              page.reload();
            } else {
              const jsonData = JSON.stringify(arrone, null, 2);
              fs.writeFile(currentDirToJsonFile + "data.json", jsonData, 'utf8', (err) => {
                if (err) {
                    console.error('Ошибка записи в файл! =>', err);
                }
                console.log('Новые данные записаны в файл успешно!');
                sendJsonFileOnServer();
            });
            }
          } catch (error) {
            console.error('Ошибка парсинга JSON файла =>', error);
          }
        }
      });
    
    };
  
    setTimeout(() => other(), 350);
  
    async function other() {
        setTimeout(async() => {
          const text = await page.$$eval('tbody > tr > td > div > div > p > a', (nodes) =>
            nodes.map((node) => ({
              url: node.href,
              description: node.innerText,
          }))
        )
        if (text.length > 0) {
          writeToFile(text)
        } else {
          console.log('Массив данных пуст')
        }
        }, 16100);

        setInterval(async() => {
          const text = await page.$$eval('tbody > tr > td > div > div > p > a', (nodes) =>
            nodes.map((node) => ({
              url: node.href,
              description: node.innerText,
          }))
        )
        if (text.length > 0) {
          writeToFile(text)
        } else {
          console.log('Массив данных пуст')
        }
        }, 300000);

    };

  }
};
