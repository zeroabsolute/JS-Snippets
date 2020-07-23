const Puppeteer = require('puppeteer')
const Cheerio = require('cheerio');

scrape();

async function scrape() {
  const url = 'https://coderstats.net/';
  const browser = await Puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle0' });

  const bodyHandle = await page.$('body');
  const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
  const $ = Cheerio.load(html);
  const mostFollowed = $('.main #followed-users .row').children();
  const mostRepositories = $('.main #most-repos-users .row').children();

  const mostFollowedTop3 = Object.values(mostFollowed).slice(0, 3).map((item, index) => {
    const username = $(item).find('a').text();

    return `${index + 1}) ${username.replace(/[^a-zA-Z0-9]/g, "")}`;
  });
  const mostRepositoriesTop3 = Object.values(mostRepositories).slice(0, 3).map((item, index) => {
    const username = $(item).find('a').text();

    return `${index + 1}) ${username.replace(/[^a-zA-Z0-9]/g, "")}`;
  });
  
  await browser.close();

  console.log(`
  Top 3 most followed users on GitHub:
  ${mostFollowedTop3.join('\n  ')}\n
  Top 3 users with most repositories on GitHub:
  ${mostRepositoriesTop3.join('\n  ')}
  `);
}