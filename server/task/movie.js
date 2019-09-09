const cp = require('child_process')
const { resolve } = require('path')

;(
  async () => {
    const scripts = resolve(__dirname, '../crawler/trailer-list') // is comma, not a plus
    const child = cp.fork(scripts, [])
    let invoked = false 
     
    child.on('err' , err => {
      if (invoked) return
      invoked = true 
      console.log(err)
    })
    child.on('exit', code => {
      if (invoked) return
      invoked = false
      let err = code === 0 ? null : new Error('exit code' + code)
      console.log(err)
    })
    child.on('message', data => {
      let result = data.result
      console.log(result)
    })
  }
)()