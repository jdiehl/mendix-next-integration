const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const httpProxy = require('http-proxy');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = httpProxy.createProxyServer({ ws: true })

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Host', 'localhost:8080');
})

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    // if (pathname === '/manifest.webmanifest') {
    //   proxy.web(req, res, { target: 'http://localhost:8080' })
    // } else 
    if (/^\/(xas|mxdevtools)\//.test(pathname)) {
      proxy.web(req, res, { target: 'http://localhost:8080' })
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
