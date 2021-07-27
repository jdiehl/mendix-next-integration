const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const httpProxy = require('http-proxy');



const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = httpProxy.createProxyServer({ ws: true })

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  console.log(`proxyrequest: ${req.url}`)
  proxyReq.setHeader('Host', 'localhost:8080');
})
let shot = false
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
      console.log(`handle:  url: ${req.url} ${JSON.stringify(parsedUrl)} `)
      if (req.url === '/index.html') {
        if (!shot)
        {
          console.log(`*** ${JSON.stringify(parsedUrl)}`)
          const compurl = parse('http://localhost:8080/link/component', true)
          handle(req, res, compurl)
          shot=true
        }
        else handle(req, res, parsedUrl)
      }
      else handle(req, res, parsedUrl)

      if (req.url === '/widgets/SprintrFeedbackWidget/ui/images/ic_mobile.svg') shot=false
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
