/* eslint-disable */
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  // readOnly: true,
})

router.render = (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.jsonp({
    body: res.locals.data
  })
}
server.use(middlewares)
server.use(router)
server.listen(4000, () => {
  console.warn('JSON Server is running')
})
