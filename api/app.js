const express = require("express");
const app = express();
const helpers = require("../helpers/helpers");
const axios = require("axios");


const PORT = process.env.PORT || 5000;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const TWITTER_API = process.env.TWITTER_API || "https://api.twitter.com/2/tweets"


function postTweet(client_response) {
	axios({
	  method: "post",
	  url: TWITTER_API,
	  data: {
	    text: "JavaScript is awesome!!!"
	  },
	  headers: {
	   "Authorization": `Bearer ${ACCESS_TOKEN}`,
	   "Content-type": "application/json"
	  }
	}).then(response => {
		client_response.send(response);
	}).catch(err => {
		client_response.send(err.message);
	});

}

app.get("/", function (request, response) {
	response.send({ message: "nothing to see here 🍕!" })
});

app.get("/callback", function (request, response) {
	const code = helpers.toString(request.query.code);
	response.send({ code:  code, request: request.headers });
});

app.get("/test" , function (request, response) {
	postTweet(response);
})

app.listen(PORT, function () {
	console.log(PORT);
});
