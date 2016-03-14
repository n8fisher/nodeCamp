"use strict";

let http = require('http');
let request = require('request');
let destinationUrl = '127.0.0.1:8000';

http.createServer((req, res) => {
	console.log(`Request received at: ${req.url}`)
	res.end('hello world\n')
    }).listen(8000);

http.createServer((req, res) => {
	// Proxy code here
	console.log(`Proxying request to: ${destinationUrl + req.url}`)
	let options = {
	    headers: req.headers,
	    url: `http://${destinationUrl}${req.url}`
	};
	options.method = req.method
	req.pipe(request(options)).pipe(res)

    }).listen(8001);


