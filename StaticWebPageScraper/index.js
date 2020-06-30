const Cherio = require('cheerio');
const Axios = require('axios');

scrape();

async function scrape() {
  const url = 'https://nodejs.org/en/';
  const response = await Axios.get(url);
  const $ = Cherio.load(response.data);
  
  const title = $(`meta[property='og:title']`).attr('content');
  const description = $(`meta[property='og:description']`).attr('content');

  console.log(`
    Result:
    
    Page title: ${title}
    Page description: ${description}
  `);
}