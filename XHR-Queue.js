XHR_QUEUE = function(){};

XHR_QUEUE.prototype.add = function(method, url, onSuccess, onError, data){

	var reqArg = {
		method: method,
		url: url,
		onSuccess: onSuccess,
		onError: onError,
		data : data ? data : {}
	};

	if(this.requests)
    	this.requests.push(reqArg);
	else
		this.requests = [reqArg];

	return this;

};

XHR_QUEUE.prototype.start = function(callback){
	
	if(callback)
		var resArr = [];
		
	var self = this;
	var reqLength = this.requests.length;

	function ExecuteRequests(i){
		if(i === reqLength){	// BASE CASE
			
			self.requests.length = 0;	// Clean requests queue
			
			if(callback)
				callback(resArr);		
			else
				return ;
		}else{					// RECURSIVE CASE
			
			CreateHTTPRequest(
				self.requests[i].method,
				self.requests[i].url,
				function(res){
					if(callback)
						resArr.push(res);
		    		self.requests[i].onSuccess(res);
		    		ExecuteRequests(i+1);
		  		},
		  		function(res){
		  			if(callback)
						resArr.push(res);
		    		self.requests[i].onError(res);
		    		ExecuteRequests(i+1);
		  		},
		  		self.requests[i].data
		  	);	
    	}
	};

	ExecuteRequests(0);	// START RECURSIVE FUNCTION
};


function CreateHTTPRequest(method, url, onSuccess, onError, data){
	
	var xhr = Ti.Network.createHTTPClient();

	// Open the HTTP connection
	xhr.open(method, url);

	// When the connection was successful
	xhr.onload = function() {
		onSuccess(JSON.parse(this.responseText));
	};

	// When there was an error
	xhr.onerror = function(e) {
		onError(e.error);
	};

	xhr.send(data);

};

module.exports = XHR_QUEUE;