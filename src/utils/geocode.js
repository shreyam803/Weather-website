const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hyZXlhbTgwMyIsImEiOiJja2ZsYjdvMHcwaWVkMnJwaWZidTU2djJpIn0._mToqr8RCtp7VzeySHt1cQ&limit=1';

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find location.Try another City', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name          //destructing
            })
        }
    })
}



module.exports = geocode