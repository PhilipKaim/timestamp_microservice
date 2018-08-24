const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

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