const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');

let date = new Date();
let time = {
    unix: date.getTime(),
    utc: date.toUTCString()
};

describe('GET /api/timestamp', () => {
    it('should get the current unix timestamp and current utc time', (done) => {
        request(app)
            .get('/api/timestamp')
            .send(time)
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual(time);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe('GET /api/timestamp/:date', () => {
    it('should send unix and utc date/time if timestamp is valid', (done) => {
        let timestamp_Sec = 1234567890;
        let timestamp_Mill = (timestamp_Sec * 1000); 
        let unix = (new Date(timestamp_Mill)).getTime();
        let utc = (new Date(timestamp_Mill)).toUTCString();
        let time = {
            unix,
            utc
        };

        request(app)
            .get(`/api/timestamp/${timestamp_Sec}`)
            .send(time)
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual(time);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should send unix and utc date/time if data format(yyyy-mm-dd) is valid', (done) => {
        let timestamp = '2008-12-20';
        let unix = (new Date(timestamp)).getTime();
        let utc = (new Date(timestamp)).toUTCString();
        let time = {
            unix,
            utc
        };

        request(app)
            .get(`/api/timestamp/${timestamp}`)
            .send(time)
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual(time);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should send Invalid Date if timestamp is not valid', (done) => {
        let timestamp = '200abc*//3';
        let unix = (new Date(timestamp)).getTime();
        let utc = (new Date(timestamp)).toUTCString();
        let time = {
            unix,
            utc
        };

        request(app)
            .get(`/api/timestamp/${timestamp}`)
            .send(time)
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});