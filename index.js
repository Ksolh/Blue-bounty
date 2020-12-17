const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const https = require('https')
const logger = require('express-logger')
const fs = require('fs')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger({path: '/logs/backendlog.txt'}))

require('./routes/userRoutes')(app);
require('./routes/noteRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('front/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
    });
}

const PORT = require('./settings.json').httpPort || 5001;
const PORTHS = require('./settings.json').httpsPort || 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});

try {
    var credentials = {
        key: fs.readFileSync('./privkey.pem', 'utf8'),
        cert: fs.readFileSync('./cert.pem', 'utf8')
    }

    var httpsServer = https.createServer(credentials, app)
    httpsServer.listen(PORTHS)
} catch (er) { }