const puppeteer = require('puppeteer');
const path= require('path');
const fs = require('fs');
const { sendJsonFileOnServer } = require('./client.js');

const currentDirToJsonFile = path.join(__dirname, './files/');

module.exports = {
  async run() {

    // выполнить с открытием нового браузера
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: false,
      defaultViewport: null,
      args: [
        '--window-size=1920,1080',
      ],
    });

    // выполнить в текущем браузере с режимом отладки
    // перед запуском нужно на ярлык повесить флаг
    // --remote-debugging-port=9222
    // после запуска по ярлыку узнать идентификатор
    // перейдя по ссылке
    // http://127.0.0.1:9222/json/version
    // скопировать идентификатор
    // добавить идентификатор после /browser/
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/cfd17651-9fe3-4ec5-9853-1f4bec557b49',
    // });
  
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
      
      // вариант с чтением из файла fs.readFile
      // способ записи с помощью фикса перезагрузки
      // nodemon run.js --ignore 'files/*'

      fs.readFile(currentDirToJsonFile + 'data.json', 'utf8', (error, fileContent) => {
        if (error) {
          console.error('Ошибка чтения файла =>', error);
        } else {
          try {
            let oldData = JSON.parse(fileContent);
            let newData = arrone[0].url;
            let oldData1 = oldData[0].url;
            // для парсинга всей страницы раскомментировать
            // if (JSON.stringify(oldData) === JSON.stringify(arrone)) {
            if (newData === oldData1) {
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

      // вариант с импортом из файла require
      // способ записи с помощью фикса перезагрузки
      // nodemon run.js --ignore 'files/*'
      // let oldData = require('./files/data.json');
      // if (JSON.stringify(oldData) === JSON.stringify(arrone)) {
      //   console.log('Новых данных нет');
      //   page.reload();
      // } else {
      //   const jsonData = JSON.stringify(arrone, null, 2);
      //   fs.writeFile(currentDirToJsonFile + "data.json", jsonData, 'utf8', (err) => {
      //       if (err) {
      //           console.error('Ошибка записи в файл! =>', err);
      //       }
      //       console.log('Новые данные записаны в файл успешно!');
      //       sendJsonFileOnServer();
      //   });
      // }

      // способ записи без перезагрузки скрипта
      // с помощью записии в текстовый файл
      // для этого метода необходимо изменить настройки
      // серверного скрипта и client js
      // fs.readFile(currentDirToJsonFile + 'data.txt', 'utf8', (error, fileContent) => {
      //   if (error) {
      //     console.error('Error reading file:', error);
      //   } else {
      //     try {
      //       let oldData = JSON.parse(fileContent);
      //       if (JSON.stringify(oldData) === JSON.stringify(arrone)) {
      //         console.log('Новых данных нет');
      //         page.reload();
      //       } else {
      //         fs.writeFile(currentDirToJsonFile +'data.txt', JSON.stringify(arrone), (error) => {
      //           if (error) {
      //             console.error('Error writing file:', error);
      //           } else {
      //             console.log('Новые данные записаны в файл успешно!');
      //             sendJsonFileOnServer();
      //             page.reload();
      //           }
      //         });
      //       }
      //     } catch (error) {
      //       console.error('Error parsing JSON:', error);
      //     }
      //   }
      // });
    
    };
  
    // let login = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done promiseone!"), 150);
    // });
    // login.then(
    //   async result => await page.type('#login-form-username', 'your_login')
    // );

    // await page.type('#login-form-password', 'Budu2024')
    // let pass = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done promiseone!"), 250);
    // });
    // pass.then(
    //   async result => await page.type('#login-form-password', 'your_password')
    // );
  
    // let sub = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done promiseone!"), 350);
    // });
    // sub.then(
    //   result => other()
    // );

    // при варианте при ручном вводе логина и пароля 
    setTimeout(() => other(), 350);
  
    async function other() {
  
      // при варианте автоввода логина и пароля
      // await page.click('#login')
      // page.waitForNavigation({ waitUntil: 'networkidle2' })
      // .then(() => {

        // setTimeout(async() => {
        //   await page.click('#browse_link')
        // }, 2000);

        // setTimeout(async() => {
        //   await page.click('#admin_main_proj_link_lnk')
        // }, 3800);
  
        // setTimeout(async() => {
        //   await page.click('#pinnednav-opts-sd-queues-nav > div.js-pinned-items-list > div > div > ul.aui-nav.nav-group-items.js-items-section.sortable-items.js-sortable-items.ui-sortable > li:nth-child(2) > a > span')
        // }, 9300);
  
        // получение первых данных через 16 секунд
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

        // последующие данные через интервал 5 минут
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
        
      // при варианте автоввода логина и пароля
      // });
    };

  }
};
