const fs = require('fs');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const ora = require('ora');

const urlPrefix = 'https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/';
const pageSize = 1000;

console.log(downloadPage(0));

function downloadPage(page){
  const startPage = page * pageSize + 1;
  const endPage = (page + 1) * pageSize;
  const url = `${urlPrefix}${startPage}-${endPage}`;
  console.log(`page: ${url} `)
  const spinner = ora(`fetching...`).start();

  return download(url)
    .then(body => {
      spinner.stop();
      console.log(`success! length: ${body.length}`);
      const pagePath = `./pages/${page + 1}.html`;
      fs.writeFileSync(pagePath, body, 'utf-8');
      console.log(`write in ${pagePath}`);

      if (page >= 9) {
        console.log('complete!');
      } else {
        downloadPage(++page);
      }
    });
}

function download(url) {
  return fetch(url, {
    agent: new HttpsProxyAgent('http://127.0.0.1:10809')
  }).then(
    res => res.text(),
    err => {
      console.log(err);
    }
  ).catch(err => {
    console.log(err);
  });
}
