// All console.log ()here will be shown in browser (right click on empty page in browser->inspect)->console

// selecting the form element in index.hbs
const weatherForm = document.querySelector("form")

//selecting the input tag in index.hbs
const search = document.querySelector("input")

// selecting the <p> tag where forecast message shows in index.hbs
const messageOne = document.querySelector("#message-1")


// selecting the reset button in index.hbs that will reset the old contents
const reset = document.querySelector(".reset")


// calling addeventlistener for rest button to check for click events, if click event happen, it will run the anonymous function provided as arrow function here.
// addEventListener accepts two arguments, first one is the name of the event we're trying to listen for.(we have many different events available) and second one is a callback function which runs every single time that event occurs.
// addEventListener only works if the form is parsed or data is available fro index.hbs,beacuse if we load javascript file <script> tag in <head> tag, this script will run before form is parsed that is in body, so placing <script> tag in body will solve the problem, this file will load after form is parsed in body.


// calling addeventlistener for form element to check submit events, if submit event happen, it will run the anonymous function provided as arrow function here.
weatherForm.addEventListener("submit", (e) => {

    // the default behavior of forms is to completely reload the page and that made sense a long time ago before we had access to good client side JavaScript. Now though, what we're gonna do is use fetch to fetch the data and we'll dynamically add it onto the fly so we don't need to refresh the page a bunch, causing a flash of content or confusing the user.We'll be able to preserve everything on the page like what they've typed inside of the input.To avoid refresh the page on form submission, grab the argument that's provided to our event callback. It is an event object, you could call it event commonly as e qround the web developers and then we use a single method on it.It's the only method we're ever gonna use on this event object called e.preventDefault()

    // Prevent default is going to prevent that default behavior which is to refresh the browser,allowing the server to render a new page and instead, it's gonna do nothing,It's just going to allow us to do whatever we want by letting the function run.
    e.preventDefault()

    // using the try catch beacause when resetting  (removing) the values (weather forecast data, weather forecast picture) in previous search, in some case no nodes found to be deleted, so at that time , program will not crash and catch will handle the block with console.log() call.
    try {

        // selecting the weather forecast picture using queryselector all , so all weather forecast pictures is selected and stord in a array like format. 
        const element = document.querySelectorAll(".weather-picture");
        console.log(element, element.length)
        // looping the selected array above and removing the pictues using element.remove()
        for (let i = 0; i < element.length; i++) {
            element[i].remove();
        }

        //selecting the <p> tag (here <p> tag where forecast message shows in index.hbs) and changing content as Loading...
        messageOne.textContent = "Loading..."

    }
    catch (error) {
        console.log("Node not found to be deleted");
    }

    // getting location value (value user provides in web page) from input box .
    const location = search.value

    // to actually make the HTTP request from client side JavaScript, we'll be using the very popular fetch API.

    // fetch API is not part of JavaScript. It is a browser based API which means it's something we can use in all modern browsers, but it's not accessible in node JS.

    // So the code we write inside of here is not gonna be something you'll be able to use in a backend node script, Here this script is running in client side Java script. so using the Fetch API is perfectly fine.

    // Now fetch is a function, so we're going to call it and it accepts url(site we are firing for request) as a argument, calling Fetch in our client side Java script is gonna kick off an asynchronous IO operation, much like calling a request in node JS did.That means we don't have access to the data right away, Instead, we provide a function(then) and that function will run at some point in the future when the data is available.

    // With the Fetch API, we use the then method on the return value from fetch and we provide to it the callback function we wanna run and we get access to the response as the first and only argument, inside of callback function we can use the response to do whatever we want to do, like extract the data and render it to the browser or just dump it to the console.

    // then method is part of a much bigger API we'll be exploring later in the class known as Promises. We're going to explore Promises and its companion, Async/await, in detail in just a couple of sections when we learn how to connect node JS to a database.

    fetch(`/weather?address=${location}`).then((response) => {

        // response.json() function is going to run when the JSON data has arrived and been parsed,we have access to the parsed data called javascript object(first and only argument) in callback function and can be used inside the callback function to whatever we want to do.
        response.json().then((data) => {

            // if error occurs, this block will run ,if no error occurs, value of data.error will be undefined, if block will fail so else block will be executed.
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            }
            else {

                // selecting the parentNode (<div> tag , inside this div , we have header,p,form tags)
                const parentNode = document.querySelector(".main-content")

                // creating the new node(<img> tag) in Javascript
                const newNode = document.createElement("IMG");

                // setting src,width,height,alt attribute values for new node created(<img> tag)
                newNode.setAttribute("src", data.weather_image_link);
                newNode.setAttribute("width", "150px");
                newNode.setAttribute("height", "auto");
                newNode.setAttribute("alt", data.weather_description)

                //setting classname for new node created for DOM manipulations
                newNode.className = "weather-picture"

                // selecting the existing node(here <p> tag where forecast message shows in index.hbs)
                const existingNode = document.querySelector("#message-1")

                // insering image node (new Node) created here before existing node(here <p> tag where forecast message shows in index.hbs), if existing node not found , add newnode to parent node last child element. 
                parentNode.insertBefore(newNode, existingNode)

                // setting the forecast content to message-1(<p> tag where forecast data shows up).
                messageOne.textContent = data.forecast


                // this console.log response data will be shown in browser console(right click and inspect in blank area of web page(developer tools)->console) when we load our home page(index.hbs) in browser, because this client side javascript file linked to the index.hbs file.
                console.log(data.forecast)

            }


        })
    })

})

