const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoid29vZHNleSIsImEiOiJjbGE0YmprdmgwejBqM3Fwa2VlZGV2ZXU4In0.Gbm6qRN0g6tBtcslU26W_g&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;
