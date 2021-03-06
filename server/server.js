const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 2000;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/api/timestamp/:date', (req, res) => {
    let timestamp = req.params.date;
    let utc;
    let unix;
    let valid;
    
    const validate = (timestamp) => {
        valid = (new Date(timestamp)).getTime() > 0;
        unix = new Date(timestamp).getTime();
        utc = new Date(timestamp).toUTCString();
    }

    if (timestamp.indexOf('-') > -1) {
        validate(timestamp);
    } else {
        // converted from seconds to milliseconds for date constructor
        validate(timestamp * 1000);
    }

    if (valid) {
        res.send({
            unix,
            utc
        });
    } else if (!valid) {
        res.send({
            error: 'Invalid Date'
        });
    }
});

app.get('/api/timestamp', (req, res) => {
    let date = new Date();

    res.send({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = { app }