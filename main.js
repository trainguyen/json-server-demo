const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const queryString = require('query-string');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// Custom output for LIST with pagination
router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParam = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParam._page) || 1,
        _limit: Number.parseInt(queryParam._limit) || 10,
        _totalRow: Number.parseInt(totalCountHeader),
      },
    };
    return res.jsonp(result);
  }
};

// Custom output for LIST with pagination
// router.render = (req, res) => {
//  if(req.method==='GET'){
//    const result={
//      data:res.locals.data
//    }
//    return res.jsonp(result);
// }
// }

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    (req.body.createdAt = Date.now()), (req.body.updateedAt = Date.now());
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use('/api', router);
// Use default router
const PORT = 3000;
server.listen(process.env.PORT || PORT, () => {
  console.log(PORT || 'JSON Server is running');
});
