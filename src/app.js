// In this code creating and running node js based server, With the Node server we can serve up whatever our application needs. 

// For E.g To create a portfolio website of our work,we can create a Node server that serves up all of the assets the browser would need to load. This would include HTML documents, CSS files to style the page, client side JavaScript and maybe some images of my work. Now we could also take the other approach with the server and instead of serving up a website, we could serve up an HTTP JSON based API. That would be similar to the Mapbox or the Dark Sky API, where we're exchanging JSON data back and forth with the server. 

// We're going to start off by creating simpler web servers. Then once we're comfortable with that, we're gonna move on to create HTTP based APIs, with database storage, authentication, email sending, and more. 

// the tool we're gonna use to create our Node servers is the very popular Express library. Express is one of the original NPM packages. Express definitely helped put NodeJS on the map back in the day, because it made it so easy to create web servers Whether you wanted to serve up something like, a static website or whether you wanted to create a complex HTTP JSON based API to serve as the backend for something like a mobile or web application.

// focussing on actually creating a NodeJS script that will create, configure and start up the server using Express

// Express is a Popular and Mostly used NPM library, Express makes it really easy to create web servers with Node, These servers are gonna allow us to serve up all of the assets for our web application.

// importing the express library from npm library(third party module) using npm i express command after initializing npm using npm init -g command. 
// we're going to load in Express, configure it to serve something up and then we're gonna start the server.
const express = require('express')

// importing the path library (used to work with path manipulations) from (npm library) third party module 
const path = require('path')

// importing the hbs library (used to work with partials) from npm library third party module
const hbs = require('hbs')


// extract the port value that Heroku or cyclic provides.That is available at process.env. Env is an object and it's where we can access environment variables.Now this is exactly what Heroku or cyclic sets and we'll learn how to set our own a bit later in the class. Now, this is only gonna be set on Heroku, or cyclic which means that when we run the app locally,it fails so using 3000 as a backup port value.
const port = process.env.PORT || 3000


//importing the own module created by ourself(javascript file created and exporting the required data in the javascript file, so that data will be accessed from the javascript file where it loads the module .)
// when we load the own module created using require, data(function,variable,object) exported in that loaded module file will be the return value and that can be stored in a variable like below.

const geocode = require('./utils/geocode.js')

//importing the own module created by ourself(javascript file created and exporting the required data in the javascript file.)
// when we load the own module created using require, data(function,variable,object) exported in that loaded module file will be the return value and that can be stored in a variable like below.

const forecast = require('./utils/forecast.js')





// what the Express Library exposes is just a single function when we try to import using require above. So Express is actually a function as opposed to something like an object and we call it to create a new Express application.
// creating a constant called express to store our express application and all we do to generate the application is call Express. Now, the Express function doesn't take in any arguments. Instead, we configure our server by using various methods provided on the application itself.
const app = express()


// using path.join() function, we are creating a string for public directory path with file name 
// path.join() takes many individual path pieces and join them,
// here we pass first argument as __dirname and second argument as string '../public' - path.join() understands to move up one folder from current directory and point to public folder.
// creating public path(all static files to serve up will be present here)
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)




// creating viewsPath (all dynamic files(dynamic pages) to serve up will be present here)
const viewsPath = path.join(__dirname, '../templates/views')

// creating partialsPath (all partial files(files that can be reused in views directory files(dynamic pages)) to serve up will be present here)
const partialsPath = path.join(__dirname, '../templates/partials')




// Template engine is used to render dynamic webpages using Express. we are going to use handlebars template engine for this weather-app.
// Handlebars allow us to do two important things 
//          * it allows us to render dynamic documents as opposed to static ones. 
//          * it allows us to easily create code that we can reuse across pages. 
//                  e.g we'll be able to easily use and reuse little pieces of markup throughout the various pages in our app. 
//                      if we need some header tag or footer tag in all html documents , we don't need to create it on all html documents, instead it would be nice to be able to have 
//                      the header markup in one place and be able to reuse it across all of the pages in my site. 
// Handlebars is a very pouplar templating tool or engine, its a npm module, we can download in same way as we install npm third party module 
// Handlebars.js is a low level library that implements Handlebars in JavaScript, It can be used in a wide variety of settings like the browser, the server, desktop applications with Electron or anywhere else that JavaScript can be used.
// Now for our purposes we wanna use Handlebars with our Express server.But the Handlebars module isn't gonna let us get that done. 
// So There is another Handlebars library though which you can think of, kind of like a plugin for Express which essentially integrates Handlebars into Express. That is HBS, which is short for Handlebar, is the library that we're gonna install and set up. Now HBS uses Handlebars behind the scenes.HBS just makes it really easy to integrate with Express. hbs is also a npm module, we can download in same way as we install npm third party module . 
//Now when we go ahead and install that hbs module it's going to get all of the codes set up in node modules as always and it'll add the dependencies to package.json and package-lock.json
// Now when we're working with Express, it expects all of your views,in this case, our Handlebars templates(pages to be loaded dynamically e.g home page or help page) to live in a specific folder that is in the root of the project alongside of node modules .It's supposed to live in a folder called views.
// we can replace index.html in public directory path here like index.hbs (hbs is a handlebars extension) inside views , So instead of the homepage being a static document served up from public it's going to be a Handlebars template (pages to be loaded dynamically)
// we have html contents in all of our files in views directory(pages to be loaded dynamically present here)
// So instead of the homepage being served up as a static file, we are going to render it using Handlebars and Express serving this document up to the user.
// so to serve static contents, put html,css, etc file in public and to serve dynamic contents put those dynamic content files in views folder with hbs extension(handlebars)


// below line tells express which templating engine we installed 
// There is a method on app called set, set allows you to set a value for a given Express setting and there are a few. 
// We have a key,the setting name and we have a value. 
// In our case, setting key as a 'view engine' (key name must be exactly like this if wrong express don't know which templating engine we used) and value as a 'hbs' module , single line is all we need to get Handlebars set up. Now we can actually use it to create some dynamic templates. 
app.set('view engine', 'hbs')



// settting up another setting for Express, and this one is called views.
// Remember We don't have to set it this setting in order to use handlebars, its already proven. 
// Normally Handlebars templates(pages to be loaded dynamically) should be placed in views directory (express will look for this directory default )that will be served up dynamic contents in website using handlebars, but if we want express to lookup for some other directory to look up for dynamic content, use below line .
// In our case, setting key as a 'views'(mentioning express to see Handlebars templates(dynamic pages to be loaded)in the path mentioned rather than looking on views directory as default) and value as a viewPath(path where pages to be loaded dynamically files present)
app.set('views', viewsPath)




//partials with Handlebars allows you to create a little template which is part of a bigger webpage. That's where partial comes from. So think about parts of the webpage that you're gonna end up reusing across multiple pages in your site. 
// For E.g This would be things like headers or footers where you want the exact same thing showing on every page to give your site a nice unified feel. With partials,it's gonna be really easy to create a header or footer and reuse it without needing to copy markup between all the pages in your site. 
// To work with partials, we need hbs module, it can be downloaded like npm thirdparty module as already did. Then we need to do is tell Handlebars where we are going to put our partials.


// registerpartials method in hbs takes a path to the directory where your partials live. so handlebars know where the partial files(files that can be reused) present to reuse in views file(dynamic files), but contents inside headers.hbs file in partials directory is not complete html, it's just a part of web page(here only needed html contents placed here)
// Then we are creating a partial for header named header.hbs in partials directory, This is a header that we're gonna show on all of the pages(dynamic pages served up from views directory) throughout our site.
// In header.hbs partial file in partial directory, node provided value can be accessed , because node provided value can be passed as javascript object in res.render,so this value can be accessed for specifie route in app.get method, but header.hbs is a partial file common for all view files, so it can be accessed like accessed in views directory files. 
// we also added navigation bar in header.hbs in partials directory, it can be shown on all view pages(dynamic pages) , because we mentioned to use header.hbs content in all views file , so important use of partial is to reuse the needed content in all pages. 
// For e.g header is present in partial file and its mentioned to use partials in all views file, if any changes needed in header, we can change contents in partial file because it reflects in all view files . Fantastic!!
hbs.registerPartials(partialsPath)



// example to understand route
// app.com - '' -> home page route
// app.com/help - '/help' -> help page route
// app.com/about - '/about' -> about page route


// node provides this __dirname and __filename data, actually when we debug our notes-app ,our whole code wrapped in function,that function gave some arguments data like require module,so that function provides this two data also.

// both gives absolute path, whole path from root of our hard drive/system
console.log(__dirname) // it will give the path of the current directory our code is running
console.log(__filename) // // it will give the path of the current diectory with current file name our code is running




//                                           NOTE!!!!!!!! 

//  express will look for the routes for any pages(home page(''), help page('/help) or /about.html in public path, /about.hbs in view ), it will use the first match whether it is to serve a static file contents in public directory path or serve dynamic content in views directory or response we send here in the code itself.
// consider /about.html in public and /about.hbs in view, suppose if route to serve static content match found first, it will execute /about.html or if route to serve dynamic content using files in view, /about.hbs will execute if this found first.




// we're gonna do is configure express to serve up an entire directory of assets That could contain HTML files, CSS files ,client side JavaScript ,videos, images and more. 
// This is gonna live in the web server folder alongside of node modules and alongside of source. And I'm gonna call this public(public directory path).Anything that goes inside of here is gonna be served up as part of our express server. In here, we can put in HTML files and our other assets.
// app.use method ,As of now we need to know it will use to customize our server, here we customizing server to serve up publicDirectoryPath folder, it will be explained depth later as promise
// express.static is a function ,it takes the path(here we pass publicDirectoryPath) and in some way it configures to serve up our publicDirectoryPath folder file content (index.html, a special file and it's a default file content will be loaded)in root page of the server by passing the return value to app.use method.
// all the files in the static folder here publicDirectoryPath folder content like css, javascript, html will be loaded in web server.

app.use(express.static(publicDirectoryPath))



// app function contains many methods 
// app.get method , This lets us configure what the server should do when someone tries to get the resource at a specific URL, Maybe we should be sending back HTML, or maybe we should be sending back JSON.
// get method contains two arguments ,
//    * route(partial url)
//    * callback function describes what we wanna do when someone visits this particular route.
//          this function contains two arguments  
//               * req - request object containing information about the incoming request to the server.
//               * res - response, this contains a bunch of methods allowing us to customize what we're gonna send back to the requester.We could do something like read data from the database or create some HTML and we could use various methods on response to actually send a response back.




//setting response for home route ('')
app.get('', (req, res) => {
    // providing text content to send method that will visible in browser
    //res.send('Hello Express!')


    // To serve dynamic content in views directory, using render as a response, Render allows us to render one of our views. We've configured Express to use the view engine HBS. So with render, we can render one of our Handlebars templates. 
    // res.render method takes two arguments,the first argument is the name of the view provide without extension is enough (here we can provide index for file index.hbs in view directory) and the second argument is an object which contains all of the values you want that view to be able to access.
    // res.render('index') - for this line Express goes off and it gets that view(here index.hbs in view directory).express will understand its a html in index.hbs and it then converts it into HTML and html will be loaded in the browser for the requestor.
    // node js value provided here in the second argument as an object for the render will be accessible in the template(index.hbs file in views directory)
    // we can delete the html file in static public directory path if you need, but still css,images,javascript file will be loaded from that directory and use it in files in views directory.
    res.render('index', {
        title: "Weather",
        name: 'Yuvaraja',
    })
})


// setting response for about route (/about)
app.get('/about', (req, res) => {
    // html content provided in send method. we can pass html directly inside quotes, express will understand its a html and shown in browser correctly.
    //res.send('<h1>About</h1>')


    // To serve dynamic content in views directory, So using render as a response, Render allows us to render one of our views. We've configured Express to use the view engine HBS. So with render, we can render one of our Handlebars templates. 
    // res.render method takes two arguments,the first argument is the name of the view provide without extension is enough (here we can provide about for file about.hbs in view directory) and the second argument is an object which contains all of the values you want that view to be able to access.
    res.render('about', {
        title: 'About',
        name: 'Yuvaraja',

    })

})


// setting response for help route ('/help)
app.get('/help', (req, res) => {
    // text content provided in send method that will visible in browser
    //res.send('Help Page')

    // To serve dynamic content in views directory, So using render as a response, Render allows us to render one of our views. We've configured Express to use the view engine HBS. So with render, we can render one of our Handlebars templates. 
    // res.render method takes two arguments,the first argument is the name of the view provide without extension is enough (here we can provide help as a name for file help.hbs in templates->view directory) and it will check the files default in views directory alongside of node modules and alongside of source but if we provide our custom path to check dynamic contents above, it wil check on that(here templates->view directory->help.hbs ) and the second argument is an object which contains all of the values you want that view to be able to access.
    res.render('help', {
        help: "Help: Get weather data by following formats :",
        helpText1: 'By providing address in correct spelling(e.g Arumbakkam)',
        helpText2: 'By latitude,longitude(e.g 10.15,11.01)',
        title: 'Help',
        name: 'Yuvaraja'
    })

})


// setting response for weather route ('/weather) , This is the route we are using in this application to get location address from browser and send weather data to browser

// Quick recap of what our weather application do: The goal is to allow users to be able to fetch a forecast for their location from the Weather website.So instead of someone running a command from the terminal to get the forecast,they'll be able to pull up a URL in the browser. Here, they'll see a form, they type their address into an input,they click a button,and a few hundred milliseconds later,their weather information shows up.This is gonna provide a much nicer interface for interacting with our Node application.

// Then code inside of this weather route actually use the Geocode and forecast functions we created earlier.It's then going to send that JSON data back to the browser,and the browser will be able to render the forecast correctly.

// we need location address user provided in the browser, so we can get weather data with our Geocode and forecast functions, to get that done, we'll use a query string. So, the browser is going to provide a query string as part of the URL.The server will then read the query string value to get the address information.


// If we wanted to actually implement some sort of search feature, we would use a query string. Remember query strings get provided on the end of the URL,We start them off with a question mark,then we provide key value pairs to pass additional information to the server.To provide more than one key=value pair use ampersand(&)

//For an e-commerce site,I might want users to be able to search amongst the list of products for a specific one and for that, I could set up a search query argument. 
//For.eg in local host, localhost:3000/products?search=games&rating=5 this is going to fire off another request to our Express server,but it's gonna pass along this two additional information serach=games and rating=5. we are creating the back end so we can support as many query strings as we want. Query string information is available to us inside of our Express route handler. Information about that query string though, that lives on request(req in function callback)

//So The client, whether it's us typing a URL in the browser, or us providing a URL via client side JavaScript, can set up that query string, it gets sent off to the server, the server can use that information with the request, and it can send a response back.



app.get('/weather', (req, res) => {
    // The request object has a query property on there. Query is also an object and this contains all of the query string information. the query string that was provided along with the request has been parsed by Express, and the data is made available to us in this object. we can access the query string data using .notation using in javascript object

    if (!req.query.address) {
        // This is a failure message response block using the return keyword to stop the function here, we can use else for success block, but it's a common approach
        return res.send({ error: "You must Provide an address" })
    }

    // If we don't provide return in failure block above, Javascript error "Cannot set headers after they are sent to the client." will occurs beacause below respond message also work and adddress data below will be undefined. You're gonna see this error message when you try to respond to a request twice. You can't do that.HTTP requests have a single request that goes to the server and a single response that comes back.

    // storing the address provided in query string (data sent from browser as query string to express server and express server parse that data and store in request argument in callback function on get method as object, so using that to get address.)
    const address = req.query.address

    /*
    // geocode function from geocode.js exported in to object as { geocode: [Function: geocode] } , so using dot operator, calling the function using objectname.function name
    // two arguments passed one is address and another is callback function, which will be executed if callback occurs

    // we used object destructuring for second parameter in the callback function, refer in playground directory for object destructuring and shorthand concepts.
    // using default parameter as object for object destructuring in second argument of callback function
    geocode.geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            // javascript object provided in send method ,express will convert Javascript object TO JSON string using stringify and show in browser.
            // This is a failure message response block using the return keyword to stop the function here, we can use else for success block, but it's a common approach
            return res.send({ error })
        }
        
        // weather function from forecast.js exported as a function in forecast.js, so using that function for calling .
        // three arguments passed one is latitude and other is longitude and another is callback function, which will be executed if callback occurs.
        // callback chaining -- callback function inside another callback function is called callback chaining
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                // javascript object provided in send method ,express will convert Javascript object TO JSON string using stringify and show in browser.
                // This is a failure message response block using the return keyword to stop the function here, we can use else for success block, but it's a common approach
                return res.send({ error })
            }

            //console.log(`In web-server app.js, location:${location}`)
            // javascript object provided in send method ,express will convert Javascript object TO JSON string using stringify and show in browser.
            return res.send({
                forecast: data,
                location,
                address

            })

        })

        

    })
    */

    // weather function from forecast.js exported as a function in forecast.js, so using that function for calling .
    // Two arguments passed ,one is address and another is callback function, which will be executed if callback occurs.

    forecast(address, (error, data, weather_description, weather_image_link) => {
        if (error) {
            // javascript object provided in send method ,express will convert Javascript object TO JSON string using stringify and show in browser.
            // This is a failure meesage response block using the return keyword to stop the function here, we can use else for success block, but it's a common approach
            return res.send({ error })
        }

        //console.log(`In web-server app.js, location:${location}`)
        // javascript object provided in send method ,express will convert Javascript object TO JSON string using stringify and show in browser.
        return res.send({
            forecast: data,
            address,
            weather_description,
            weather_image_link

        })



    })
})




// setting response for route /help/*( it means any pages not provided route support after /help), For e.g if /help/data route provided before this that will work ,if not provided this will work and refer wildcard characters explanation below in '*' route comment explanation for more details.
app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: 'Error Page',
        name: "Yuvaraja",
        errorMessage: 'Help article not found'
    })
})






// setting response for route that we not provided support above, if we don't provide support for the route, it will end up in error, to solve that we are using wild card character * as route, so it will match for all the routes not provided other than support provided route. 
// Note, wildcard character(*)route(route not provided) should be always last route because express looks for application incoming request in order we provided in code, so if this placed before any route for e.g(/help/*),express will match this route (express will always look for first match) because it thinks for /help/* ,no support is provided and it matches with this route and not check for any other route below, because wild card character(*) matches for all routes other than route provided for support .

app.get('*', (req, res) => {
    res.render('404_page', {
        title: 'Error Page',
        name: "Yuvaraja",
        errorMessage: 'Page not found'
    })
})





// To start the server, use the method listen ,it listens on a specific port mentioned , we are using port 3000 as of now ,its not a default port , but works now for seeing thing on local host environment .
// For http based website, default port is 80.
// without starting the server , we would never able to view it in the browser
// listen method contains two arguments , one is port number and other is callback synchronous function that will run instantly when server is running, we can use console.log inside this function to indicate sever is up.
// when web server starts and it will keep on listening for incoming requests, so to stop use ctrl+c to shutdown server in terminal


//We can use port 3000 when we're running the app locally on our machine, but Heroku or cyclic is going to provide us with a port value that we have to use when our app is running on Heroku or cyclic. Now, this isn't a static value, We can hard code in the project. This is a value that changes over time, and it's provided to our application via an environment variable. An environment variable is just a key value pair set at the OS level. In this case, Heroku or cyclic sets one for the port where the value is the port number to use.

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})


/* In  
// We created the start script, because of that is what Heroku or cyclic(deployment app) is looking for when it starts up our application., we can use this command like 
npm run start 
in locally on our machine also in terminal.
"scripts": {
    "start": "node src/app.js"
    "dev": "nodemon src/app.js -e js,hbs"
},





we're going to create a second script, a development script, which is going to run that nodemon command. So currently, when we wanna start up our server using nodemon, we have to type out the command from the terminal every single time.

"scripts": {
    "start": "node src/app.js"
    "dev": "nodemon src/app.js -e js,hbs"
},
order doesn't matter for scripts creation and we can choose property names as also our wish.



so, with dev script in place, it's gonna be a lot easier for folks to start up the Dev server. It's gonna be easier for us to rerun the command, something we've had to type out so far and as we collaborate with others they'll be able to use the dev script as well, to start up that local development server easily.

Otherwise, they'd have to figure out exactly what's needed, and then have to go through that whole problem of figuring out the need to add the HBS extension as well.

If there's a command we're using often in a project, it's best to create a script that runs it, so it's reusable and accessible to everyone, even if its you it's nice to be able to reuse that script without typing things out again.

so we can use this command like
npm run dev 
in locally on our machine also in terminal.

it's time to talk about the one catch to this solution. The only reason the dev script works is because we have nodemon installed as a global module. When we have global modules installed, it's difficult for other people to know they needed to install them or problem occurs if different versions we installed, but they can't able to know that. The problem with global modules is that they're not local dependencies. So, if we're using them in a specific project, it's best to try to install everything locally.


So, imagine if I gave this project to someone else.Let's say I push this up to a public GitHub repository.Someone decides they want to add a new feature.I say, yeah, go for it and I will integrate that into my project.So, they download the code and they don't get node modules because that's ignored with Gitignore, and that's fine. They'll be able to run npm install command, it'll dig through the dependencies in packakge.json and package-lock.json files and it'll get all the modules installed.Node modules will get generated for them on their machine.It'll have express, it'll have HBS and it'll have request.


The problem is that when they go to use that dev script, it fails because while our project technically depends on nodemon, it does not have it as a dependency. And that is a problem. 
So, the solution is to uninstall nodemon globally using below command and to install it as a local dependency.
npm uninstall nodemon -g
Now, when we run this, it's going to remove nodemon, which means we can no longer run it from the terminal


To install nodemon as a local dependency , use below command 
npm install nodemon@1.2.0 --save-dev
When we install something and we use --save-dev,it lists it as a dev dependency in our project.So here under package.json, we have dependencies, in this we have express, HBS and request for weather application.we have dev dependencies and for this we just have nodemon.

Dev dependencies are dependencies you only need on your local machine while you're developing.These dependencies aren't installed in your production environment Which means that nodemon is not installed on Heroku or cyclic,etc. deployment apps . Heroku or  cyclic or etc.. never uses the dev script, beacause it uses only start script. By adding nodemon as a dev dependency,we're saving time preventing Heroku or cyclic from having to install things it's not gonna use.You could easily install this as a regular dependency and the application would still work like it's working. Now, the only difference by breaking it out into a dev dependency is that it's not installed on the production environment which once again just saves us a little bit of time..

nodemon will not work from terminal because we uninstalled globally.But In package.json in Scripts, they can use commands from locally installed modules, that is it will install nodemon locally (not in production environment, while working with local host)for particular project folder because it's present in dev dependency. So here, it is perfectly valid to use nodemon because nodemon is installed as a dev dependency.



*/

