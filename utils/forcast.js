const request = require('request')

// error in the request is used to catch low level error like when url cant be connected due to no internet connection while high level error like mistyped input has to be handled seperetely, for that remove the input like here removing the longitude and latitude and then check the response of url. The code will depend on the url returned like here an error error property is returned here 


const forcast = (latitude , longitude , callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=d0444e08867db07498a82ba856d9d088&query=' + latitude  + ',' + longitude + '&units=f'
     request({url:url, json:true}, (error, {body}) => { 
         if (error) { 
             callback("cant connect to the weather server", undefined)
         } else if (body.error) { 
             callback("cant found the weather of the location", undefined)
         } else { 
             callback(undefined, "the temperatur is" + body.current.temperature + " but the apparent temperature is " + body.current.feelslike)
         }
      })
}

module.exports = forcast

 
 