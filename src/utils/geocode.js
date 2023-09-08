//importing the node core module using require. E.g of node core modules are fs,request etc
const request = require('request')


// callback abstraction : Callback abstraction is a technique used to make our code more modular and reusable by abstracting the details of the asynchronous operation into a separate function. We can then pass a callback function to this abstracted function to handle the results of the operation.
const geocode = (address) => {
    // api url
    //url = `http://api.positionstack.com/v1/forward?access_key=357acafbec83057b285d79d6ae01227a&query= ${address}`

    url = `https://www.mapquestapi.com/geocoding/v1/address?key=dCuzKwDOmxcwX3EICyL6TGMoLb4JuFQ4&location=arumbakkam`


    // calling request function 
    // first parameter-> option object->passing url data in a url key field like below ,and get response as json, use json:true in a key:value pair separated by commas, we may have many optional fields
    // second parameter -> callback function that will run with two arguments error or response
    //    we will get response , if url works fine or we will get error if fails due to any problem. Eg internet connection fails,etc.

    // we used object shorthand in one of the properties for fist parameter in request function which is options object and used object destructuring in one of the arguments that accepts object as a value for second parameter in request function which is callback function ,refer in playground directory for object destructuring and shorthand concepts.
    request({ url, json: true }, (error, { body }) => {


        if (error) {
            // calling the callback function with error and data arguments provided
            callback('Unable to connect services', undefined)
        }
        else if (body.data == undefined || body.data.length == 0) {
            // calling the callback function with error and data arguments provided
            callback('Unable to Find Location,Try another search', undefined)
        }
        else {
            // calling the callback function with error and data arguments provided
            const data = body.results[0].locations[0].latLng
            callback(undefined,
                {
                    latitude: data.lat,
                    longitude: data.longitude,
                })

        }
    })

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

module.exports = {
    geocode: geocode

} 