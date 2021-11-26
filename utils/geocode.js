const request = require('request')

const geocoding = (address, callback) => { 
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoiYW5rdXI3NzI5IiwiYSI6ImNrdzR2cGVzbzFya2UydXJvZDZobDNibzIifQ._HNHmomeEP-MTFiw_Gu6cQ&limit=1'
   request({url:url2, json:true}, (error, {body}) => {
       if (error) { 
           callback("cant connect to the location server", undefined)
       } else if (body.features.length === 0) { 
           callback("cant find the location", undefined)
       } else { 
           const latitude = body.features[0].center[1]
           const longitude = body.features[0].center[0]
           callback(undefined, { latitude: latitude, longitude:longitude})
       }
   }
   ) 
}

module.exports= geocoding