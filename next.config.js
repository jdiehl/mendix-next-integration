module.exports = {
  reactStrictMode: true,
  rewrites: () => ({
    beforeFiles: [
      { source: '/mdx/:path*', destination: 'http://localhost:8080/:path*' }
    ],
    fallback: [
      { source: '/:path*', destination: 'http://localhost:8080/:path*' }
    ]
  })
}
