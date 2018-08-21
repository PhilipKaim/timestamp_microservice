const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

// 1451001600000

app.get('/api/timestamp/:date', (req, res) => {
    let timestamp = req.params.date;
    let seconds = timestamp * 1000;
    let date = new Date(seconds).toUTCString();

    console.log(date);
    

    res.send({
        unix: timestamp,
        utc: date
    });
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