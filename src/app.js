// calling express provides an express function and not an object 
const path = require('path')

const express = require("express")

const hbs = require('hbs')
const { rawListeners } = require('process')

const geocoding = require("../utils/geocode")
const weather = require("../utils/forcast")

const port = process.env.PORT || 3000

//calling express function
const app = express()
//express looks for views directory for view engine files, it can be changed using below code
// const path1 = path.join(__dirname, '../template') , template is example of the new file name 
// app.set('views', path1)
console.log(path.join(__dirname, '../public'))

const partialpath = path.join(__dirname, '../views/partial')

app.set('view engine', 'hbs')
hbs.registerPartials(partialpath)

app.use(express.static(path.join(__dirname, '../public')))

//the below will be accessed from the static file directly

// app.get('/help', (req, res) => { 
//     res.send(./help.html)
// })
// //if an object is sent then express will automatically parse it and will show stringfy version


// app.get('/about', (req, res) => { 
//     res.send( { name: 'andrew' , age: 27} )
// })

//for viewing dynamic files template engine is needed to be used 

app.get('', (req, res) => { 
    res.render('index', { 
        title: 'this is homepage',
        author: 'andrew mead'

    })
})

app.get('/about', (req, res) => { 
    res.render( 'about', { 
        title: 'About me', 
        author: 'andrew mead'
    })
})

app.get('/help', (req, res) => { 
    res.render( 'help', { 
        title: 'help yaha se milegi', 
        para: 'kya help chahiye '
    })
})
//http request query is used to fetch the data that is input by user, many input can be provided and it is indicated in the url, that can be fetched in req.query
app.get('/weather', (req, res) => {
    // ! indicates nothing is provided as address, else or return can be used below ,return stop the program right there and return the value  
    if (!req.query.address) { 
     return res.send("address dalo bhai")
    }
    geocoding(req.query.address, (error, {latitude, longitude}= {}) => { 
        if (error) { 
            return res.send(" no response from map server")
        } 
        weather( latitude,longitude, (error, weatherresponse) => { 
            if (error) { 
                return res.send(" no response from the weather server")
            }
            res.send(weatherresponse)
        })
    })
})

app.get('/help/*', (req, res) => { 
    res.render('404help', { 
         errormessag:'help article not found'
    })
})
app.get('*', (req, res) => { 
    res.render('404help', { 
        errormessag: " 404 not found"
    })
})

app.listen(port , () => { 
    console.log( "server is up on port" + port)
})

