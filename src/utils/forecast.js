const request = require('request')




const forecast = (latitue, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c88e315431a592092f423044bc662074&query=${latitue},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback("Unable to connect to weather service!", undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else {
      const currentWeather = body.current
      callback(undefined, `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degress out. The humidity is ${currentWeather.humidity}%.`)
    }
  })
}

module.exports = forecast
