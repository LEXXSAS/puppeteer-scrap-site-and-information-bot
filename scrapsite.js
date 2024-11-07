const puppeteer = require('puppeteer');
const path= require('path');
const fs = require('fs');

const currentDirToJsonFile = path.join(__dirname, './files/');

const writeToFile = (arrone) => {

  let oldData = require('./files/data.json');

  if (JSON.stringify(oldData) === JSON.stringify(arrone)) {
    console.log('Новых данных нет');
    const jsonNoData = JSON.stringify({"message": "Новых данных нет"}, null, 2);
    fs.writeFile(currentDirToJsonFile + "nodata.json", jsonNoData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи в файл! =>', err);
        }
        console.log('Фaйл nodata перезаписан!');
    });
    return
  } else {
    console.log('Новые данные =>', arrone);
    const jsonData = JSON.stringify(arrone, null, 2);
    fs.writeFile(currentDirToJsonFile + "data.json", jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи в файл! =>', err);
        }
        console.log('Новые данные записаны в файл успешно!');
    });
  }

};

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
  
    await page.goto("https://jira.budu.ru", {
      waitUntil: "domcontentloaded"
    })
  
    let login = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done promiseone!"), 150);
    });
  
    login.then(
      async result => await page.type('#login-form-username', 'your_login')
    );
  
    let pass = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done promiseone!"), 250);
    });
  
    pass.then(
      async result => await page.type('#login-form-password', 'your_password')
    );
  
    let sub = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done promiseone!"), 350);
    });
  
    sub.then(
      result => other()
    );
  
    async function other() {
  
      await page.click('#login')
      page.waitForNavigation({ waitUntil: 'networkidle2' })
      .then(() => {
        setTimeout(async() => {
          await page.click('#browse_link')
        }, 2000);
      
        setTimeout(async() => {
          await page.click('#admin_main_proj_link_lnk')
        }, 3800);
  
        setTimeout(async() => {
          await page.click('#pinnednav-opts-sd-queues-nav > div.js-pinned-items-list > div > div > ul.aui-nav.nav-group-items.js-items-section.sortable-items.js-sortable-items.ui-sortable > li:nth-child(2) > a > span')
        }, 9300);
  
        setInterval(async() => {
          const text = await page.$$eval('tbody > tr > td > div > div > p > a', (nodes) =>
            nodes.map((node) => ({
              url: node.href,
              description: node.innerText,
          }))
        )
  
          writeToFile(text)
          
        }, 16100);
  
      });
    };
  
  }
};
