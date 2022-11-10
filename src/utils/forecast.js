const request = require('request');


const forecast = (coords, callback) => {
    console.log("forecast() coords: " + coords);
    const url = 'http://api.weatherstack.com/current?access_key=031b59ec049136f1a0b4f58c175ecd03&query=' + coords;
    console.log("forecast() url: " + url);
    request({ url: url, json: true }, (error, response) => {


        if (error) {
            callback('Error with connection', undefined);
        } else if (response.body === 0) {
            callback('Some other error', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                precip: response.body.current.precip,
                name: response.body.location.name,
                country: response.body.location.country,
                region: response.body.location.region,
                wind_speed: response.body.current.wind_speed,
                humidity: response.body.current.humidity,
                visibility: response.body.current.visibility
            })
        }
    });
}
module.exports = forecast;