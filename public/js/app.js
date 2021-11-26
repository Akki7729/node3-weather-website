
// for fetching data provided by user on website fetch function is used. Now, this a client side js function so it will not work on node js, so browser console is used to run it 

//if below example is run then different result from this website will be shown on the console log of the website 

// fetch("http://puzzle.mead.io/puzzle").then((response) => { 
//             response.json().then((data) => { 
//                 console.log(data)
//             })
// })

// fetch("http://localhost:3000/weather?address=boston").then((response) => { 
//    response.json().then((data) => { 
//        if (data.error) { 
//            console.log(data.error)
//        } else 
//        { 
//            console.log(data.location)
//            console.log(data.forcast)
           
//        }
//    })
// })

// fetch("http://localhost:3000/weather?address=boston").then((response) => { 
//        response.json().then((data) => { 
//            if (data.error) { 
//                console.log(data.error)
//            } else 
//            { 
//                console.log(data.location)
//                console.log(data.forcast)
               
//            }
//        })
//    })

const weatherselector = document.querySelector('form')
const searchselector = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
//the input value will appear for some time and then disappear this is default function of javascript, so this is stopped using preventdefault so that output will appear on screen until reloaded by user
weatherselector.addEventListener('submit', (e) => { 
        e.preventDefault()
        const location = searchselector.value
        message1.textContent = 'loading'
        fetch("http://localhost:3000/weather?address=" + location).then((response) => { 
       response.json().then((data) => { 
           if (data.error) { 
               message1 = data.error
           } else 
           { 
               message1 = data.location
               message2 = data.forcast 
           }
       })
   })
})