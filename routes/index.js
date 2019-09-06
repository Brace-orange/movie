const router = require('koa-router')()
const ejs = require('ejs')
const ejsTpl = require('../server/ejsTpl')

router.get('/', async (ctx, next) => {
  // ctx.type='text/html; charset=utf-8'
  // ctx.body = ejs.render(ejsTpl, {
  //   title: 'this is title'
  // })
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
