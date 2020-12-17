const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api/', createProxyMiddleware({
        target: `http://localhost:5001`, // change this to whatever the current nodejs backend is
        //Ports: https -> 5000, http -> 5001
        /*
        http://75.88.242.11:5001
        http://localhost:5001
        https://api.bluebounty.tech:5000
         */
        changeOrigin: true
    }));
}