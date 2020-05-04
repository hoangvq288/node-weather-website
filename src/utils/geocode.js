const request = require('request')

const geocode = (address, callback) => {
  address = encodeURIComponent(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaG9hbmd2cTI4OCIsImEiOiJjazlwcGc2ZmswY3pxM2dwOWxjdzJwZG5sIn0.-mkV70oLYgdJZPYrtXppwQ`
  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback("Unable to connect to Geo Service", undefined)
    } else if(body.features.length === 0) {
      callback("Unable to convert Geo", undefined)
    } else {
      location = body.features[0]
      callback(undefined, {
        latitude: location.center[1],
        longitude: location.center[0],
        location: location.place_name
      })
    }

  })
}

module.exports = geocode
