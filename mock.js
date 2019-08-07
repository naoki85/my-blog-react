/* eslint-disable */
const jsonServer = require('json-server');
const server = jsonServer.create();

server.use(jsonServer.rewriter({
  '/posts/*': '/posts'
}));

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  readOnly: true,
});

router.render = (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  if (req.originalUrl.match(/posts\/(\d+)/)) {
    const postId = Number(req.originalUrl.match(/posts\/(\d+)/)[1]);
    const post = res.locals.data.Posts.filter(p => p.Id === postId)[0];
    res.jsonp({
      body: post
    });
  } else {
    res.jsonp({
      body: res.locals.data
    })
  }
};
server.use(middlewares);
server.use(router);
server.listen(4000, () => {
  console.warn('JSON Server is running')
});
