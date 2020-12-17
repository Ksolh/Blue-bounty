const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api/', createProxyMiddleware({
        target: `https://api.bluebounty.tech:5000`, // change this to whatever the current nodejs backend is
        changeOrigin: true
    }));
}