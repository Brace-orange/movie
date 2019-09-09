const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=S&range=0,10&tags='
console.log(1111)
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
}) 
;(// must have;
  async () => {
    console.log('kaishipachong')

    const browser = await puppeteer.launch({
      dumpio: false,
      args: ['--no-sandbox']
    })

    const page = await browser.newPage() // 必须是异步函数
    // await page.goto(url, {
    //   waitUntil: 'networkidle2'
    // })

    await page.goto(url, {
      waitUntil: 'networkidle2'
    })

    await sleep(3000)

    await page.waitForSelector('.more')
     
    for(let i = 0; i < 2; i++) {
      await sleep(3000)
      await page.click('.more') // 获取几页数据
    }

    const result = await page.evaluate(() => {
      var $ = window.$ // 发现网页中含有jquery，所以可以这样获取dom
      var lists = $('.list-wp a')
      let links = []

      if (lists.length >= 1) {
        lists.each((index, item) => {
          let it = $(item)
          let doubanId = it.find('div').data('id')
          let title = it.find('.title').text()
          let rate = Number(it.find('.rate').text())
          let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
          links.push({
            doubanId,
            poster,
            title,
            rate,
          })
        })
      }
      return links
    })

    await browser.close()
    // console.log(result)
    process.send({result}) // must use {}
    process.exit(0)
  }
)()