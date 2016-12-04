# XHR-Queue
### A simple implementation of requests queue for HTTPClient object of Appcelerator Titanium's framework.

## Usage :

To access this module from JavaScript, you need to do the following:

```javascript
var XHR_Queue = require("XHR-Queue");
var XHR = new XHR_Queue();
```
When you want to add an HTTP request to the queue you just have write these lines:


XHR.add( method, url, onSuccess, onError )   
*[ .add( method, url, onSuccess, onError ) ]*    
.start( *[callback]* );

- `add()` function pushes the request on the queue.
- `start()` function executes all the requests on the queue. The next request is executed only after the response's request has arrived.

| Property | Type   | Description | Required |
| -------- |:------:| ----------- |:--------:|
| method | String | HTTP method for this request, one of `"GET"` , `"POST"` , `"PUT"` ,  `"PATCH"` , `"DELETE"`. | Yes |
| url          | String | URL for the request. | Yes |
| onSuccess           | Function | Function to be called upon a successful response. | Yes |
| onError      | Function | Function to be called upon a error response. | Yes |
| callback         | Function | Function to be called when all the requests have been executed. This function brings an array with all the responses as parameter. | No |

## Example :
```javascript
var XHR_Queue = require("XHR-Queue");
var XHR = new XHR_Queue();

function onSuccess(res){
  Ti.API.error(JSON.stringify(res));
}
function onError(res){
  Ti.API.error(JSON.stringify(res));
}
function onEnd(res){
  Ti.API.error("REQUESTS EXECUTED : "  + JSON.stringify(res));
}
// URLS
var first_url = "https://api.github.com/users/grazianogrespan";
var second_url = "https://jsonplaceholder.typicode.com/posts";
var third_url = "https://jsonplaceholder.typicode.com/users";

// PAYLOAD
var data = {textMessage: "Hello World!"};

XHR.add("GET",first_url,onSuccess,onError)
   .add("POST",second_url,onSuccess,onError,data)
   .add("GET",third_url,onSuccess,onError)
   .start(onEnd);

```
## *TODO* :
- Add request headers and options
