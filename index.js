const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('./routes/userRoutes')(app);
require('./routes/noteRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('front/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
    });
}

const PORT = require('./settings.json').port || 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});