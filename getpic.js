const puppeteer = require('puppeteer');

const currentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return `${hours}${minutes}${seconds}${milliseconds}`
}

async function getPic() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://google.com/', {waitUntil: "domcontentloaded"});

  setTimeout(async() => {
    await page.setViewport({ width: 1920, height: 1080 });

    let uniqueName = currentTime() + 'high-quality.jpg';

    await page.screenshot({ path: `./screenshots/${uniqueName}`, fullPage: true, quality: 100, type: 'jpeg' });

    await browser.close();
  }, 750)

}

getPic();
