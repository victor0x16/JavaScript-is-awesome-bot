const express = require("express");
const app = express();
const helpers = require("../helpers/helpers");
const axios = require("axios");


const PORT = process.env.PORT || 5000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TWITTER_API = process.env.TWITTER_API;
const CODE_VERIFIER = process.env.CODE_VERIFIER;
const CALLBACK = process.env.CALLBACK;

function postTweet(client_response) {
	axios({
	  method: "post",
	  url: TWITTER_API + "tweets",
	  data: {
	    text: "JavaScript is awesome!!!",
	  },
	  headers: {
	  "accept": "application/json",
	  "authorization": `Bearer ${ACCESS_TOKEN}`,
	  "content-type": "application/json"
	  }
	}).then(response => {
		client_response.send(JSON.stringify(response.data));
	}).catch(err => {
		client_response.send(err.message);
	});

}

function authorizationCode(client_response, code) {
	axios({
	  method: "post",
	  url: TWITTER_API + "oauth2/token",
	  data: { 
	  	code:code,
	  	grant_type:"authorization_code",
	  	redirect_uri: CALLBACK + ,
	  	code_verifier: CODE_VERIFIER
	  },
	  headers: {
	   "accept":"application/json",
	   "authorization": `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
	   "content-type": "application/json"
	  }
	}).then(response => {
		client_response.send(JSON.stringify(response.data));
	}).catch(err => {
		client_response.send(err.message);
	});
}


function getTwitter(client_response, id) {
	axios({
	  method: "get",
	  url: TWITTER_API + "tweets",
	  params: {
	  	ids: id || 20
	  },
	  headers: {
	   "authorization": `Bearer ${ACCESS_TOKEN}`,
	   "content-type": "application/json"
	  }
	}).then(response => {
		client_response.send(JSON.stringify(response.data));
	}).catch(err => {
		client_response.send(err.message);
	});
}

app.get("/", function (request, response) {
	response.send({ message: "nothing to see here 🍕!" })
});

app.get("/callback", function (request, response) {
	const code = helpers.toString(request.query.code);
	//response.send({ code:  code, request: request.headers });
	authorizationCode(response, code);
});

app.get("/tweet" , function (request, response) {
	getTwitter(response);
});


app.listen(PORT, function () {
	console.log(PORT);
});

