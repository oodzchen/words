const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const util = require('../utils');

const DIST_FILE_PATH = path.resolve(__dirname, '../../dist/mandarin.txt');

extractPage(1);

function extractPage(page) {
  console.log(`extract page ${page}...`);
  const htmlStr = fs.readFileSync(path.resolve(__dirname, `./pages/${page}.html`), 'utf-8');
  const $ = cheerio.load(htmlStr);

  const rows = $('table.wikitable tbody>tr').map((i, el) => $(el).children('td').eq(1)
  .find('span[lang="zh-Hans"]>a').text()).slice(1);

  const wordArr = util.deduplicate(Array.from(rows));

  console.log(`word number: ${wordArr.length}`);

  const DIST_DIR_PATH = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(DIST_DIR_PATH)) {
    fs.mkdirSync(DIST_DIR_PATH, { recursive: true });
  }

  let dataStr = '';
  if (fs.existsSync(DIST_FILE_PATH)) {
    dataStr = fs.readFileSync(DIST_FILE_PATH, 'utf-8') + '\n' + wordArr.join('\n');
    fs.unlinkSync(DIST_FILE_PATH);
  }
  
  console.log(`str length: ${dataStr.length}`);
  fs.writeFileSync(DIST_FILE_PATH, dataStr, { flag: 'wx' });
  console.log('write complete!');

  if (page >=10) return;
  extractPage(++page);
}
