const request = require('request');


const forecast = (coords, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=031b59ec049136f1a0b4f58c175ecd03&query=' + coords;
    request({ url: url, json: true }, (error, response) => {
        //const data = JSON.parse(response.body);
        if (error) {
            callback('Error with connection', undefined);
        } else if (response.body === 0) {
            callback('Some other error', undefined);
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
        }
    });
}
module.exports = forecast;