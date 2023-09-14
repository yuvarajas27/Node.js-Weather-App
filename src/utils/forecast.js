//importing the node core module using require. E.g of node core modules are fs,request etc
const request = require('request')

// with the http request,our weather application is gonna be able to communicate with the outside world,So if you wanna get real time weather data into your app,you're gonna have to make an HTTP request.

// For E.g If you wanna send an email to someone from your application,that's gonna be another HTTP request and if you wanted to send someone a text message using something like the Twilio API,that would also be an HTTP request.

// http request is at the core of building real world applications that actually communicate with the outside world.

// Now, with those three examples, the weather data,email sending,text message sending it's gonna be our node application making HTTP requests to another company's servers to get some task done.That means somewhere in our code we're gonna specify the URL we wanna make a request to, this is provided via API documentation. we're going to fire that request off,sending some data possibly,and getting a response back.

// So in our Weather application, to get weather information, I would send the location I want the weather information for, I would then get back the weather information,and I could use it in whatever way I wanted to.


const forecast = (address, callback) => {

    // We have to provide our API key as well as the location that we're trying to fetch the weather for in url, To get that done, what we'll do is set up a query string. 
    // we can set up our query string by adding a question mark,then we can set up as many key value pairs as we need to, to add things like our API key and our location. 
    // To add second key value pair, we can do so by using an ampersand, followed by my second key value pair.
    //E.g http://api.weatherstack.com/current?access_key=25d74a742c43b88213b2a24a5096177e&query= ${latitude},${longitude}
    //http://api.weatherstack.com/current -- base url
    //?access_key=25d74a742c43b88213b2a24a5096177e&query= ${latitude},${longitude} - query string starts with question mark followe by first key:value pair as access_key followed by ampersand(&) and second key:value pair as query=latitude,longitude values.

    //api url, using string literals(`` present above tab key in keyboard) to fit dynamic valuse inside url
    //url = `http://api.weatherstack.com/current?access_key=25d74a742c43b88213b2a24a5096177e&query= ${latitude},${longitude}`

    url = `http://api.weatherstack.com/current?access_key=25d74a742c43b88213b2a24a5096177e&query=${address}`



    // calling request function 
    // first parameter-> option object->passing url data in a url key field like below ,and get response as json, use json:true in a key:value pair separated by commas, we may have many optional fields
    // second parameter -> callback function that will run with two arguments error or response
    // we will get response , if url works fine or we will get error if fails due to any problem. Eg internet connection fails,etc.
    // we used object shorthand in one of the properties for fist parameter in request function which is options object and used object destructuring in one of the arguments that accepts object as a value for second parameter in request function which is callback function ,refer in playground directory for object destructuring and shorthand concepts.
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // calling the callback function with error and data arguments provided
            callback("Unable to connect services", undefined)

        } else if (body.error) {
            // calling the callback function with error and data arguments provided
            callback("Unable to Find Location,Try another search", undefined)

        }
        else {
            let weather_description = body.current.weather_descriptions[0]
            let temperature = body.current.temperature
            let feelslike = body.current.feelslike
            let humidity = body.current.humidity
            let data = `${weather_description}. It is Currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}% `
            let weather_image_link = body.current.weather_icons[0]
            // calling the callback function with error and data arguments provided
            callback(undefined, data, weather_description, weather_image_link)

        }
    }
    )


}



/* 
Each module has some scope, so we need to export required data(variables,functions,etc) in the file that needs to be loaded.
Here Exporting the weather function, so that weather function can be accessed from the file where it loads this javascript file (Here e.g app.js)
To export the variable, use this syntax module.exports=variable_name 
To export the function, use this syntax module.exports=function_name
To export multiple data, we can export multiple data in to a single object , use the syntax mentioned below
  module.exports={
    key:value
  }
  we can pass property(key:value) like js object, key can be any name and property can be function,variable,object, etc.

*/


module.exports = forecast