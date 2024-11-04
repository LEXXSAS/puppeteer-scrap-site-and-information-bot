const puppeteer = require('puppeteer');

async function run() {
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
        const text = await page.$$eval('tbody > tr > td > div > div > a', (nodes) =>
          nodes.map((node) => ({
            url: node.href,
            name: node.innerText,
        })))

        // example with array of elements
        // const text = await page.evaluate(() => Array.from(document.querySelectorAll('tbody > tr > td > div > div > a'), element => element.textContent));

        console.log(text)
      }, 9500);

    });
  };

};

run();
