const fs = require('fs');
const path = require('path');
const util = require('../utils');

const SOURCE_FILE_PATH = path.resolve(__dirname, './frequency_chinese_words.txt');
console.log(SOURCE_FILE_PATH);

const txtData = fs.readFileSync(SOURCE_FILE_PATH, 'utf-8');

const pattern = /[\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD]+/g;

// console.log(txtData.match(pattern));
const chineseWords = txtData.match(pattern);

const deduplicatedWords = util.deduplicate(chineseWords);

const DIST_DIR_PATH = path.resolve(__dirname, '../../dist');
if (!fs.existsSync(DIST_DIR_PATH)) {
  fs.mkdirSync(DIST_DIR_PATH, { recursive: true });
}

const DIST_FILE_PATH = path.resolve(__dirname, '../../dist/chinese.txt');
if (fs.existsSync(DIST_FILE_PATH)) {
  fs.unlinkSync(DIST_FILE_PATH);
}
fs.writeFileSync(DIST_FILE_PATH, deduplicatedWords.join('\n'), { flag: 'wx' });
console.log('success!');
