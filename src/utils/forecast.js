const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=8ce9cb6e853adf4742f6a0fa04dcdba7'

    request({ url, json: true }, (error, {body}) => {       //shorthand
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.main.temp + ' kelvin out. There is a ' + body.main.pressure + ' hg of pressure.')
        }            //destructuring
    })
}


module.exports = forecast